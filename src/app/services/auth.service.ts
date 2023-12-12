import { Injectable } from '@angular/core';
import { User, getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ExtendedUser } from '../models/user'
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = {} as User;
  public wrongCredentials = new Subject<void>();
  
  constructor(private app:FirebaseApp, private router: Router) {  }

  async login(email: string, password: string, rememberMe: boolean): Promise<User | null> {
    const auth = getAuth(this.app);
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      await this.getCurrentUserData(auth.currentUser?.uid || '');
      console.log(this.user);
      return this.user;
    } catch (error: any) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-login-credentials') {
        this.wrongCredentials.next();
      }
      return null;
    }
  }

  async getCurrentUserData(uid: string) {
    const db = getFirestore(this.app);
    const userRef = doc(db, 'usuarios', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      this.user = {
        ...this.user,
        ...userData,
      };
    }
  }

  async logout() {
    try {
      await getAuth().signOut();
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUser(): Promise<ExtendedUser | null> {
    const auth = getAuth(this.app);
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      return null;
    }
    const db = getFirestore(this.app);
    const userRef = doc(db, 'usuarios', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as ExtendedUser;
      return {
        ...firebaseUser,
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        role: userData.role || "",
      };
    }
    return null;
  }
  
  async isLogedIn(): Promise<boolean> {
    const auth = getAuth();
    return !!auth.currentUser;
  }

  async getUserId(): Promise<string> {
    const auth = getAuth();
    return auth.currentUser?.uid || '';
  }

  async register(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone: string,
    address: string,
    role: string
  ): Promise<boolean> {
    const auth = getAuth(this.app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(getFirestore(this.app), 'usuarios', userCredential.user.uid);
      await setDoc(userRef, {
        email,
        first_name,
        last_name,
        phone,
        address,
        role,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  redirectUser(role: string) {
    console.log(role);
    switch(role) {
      case 'admin':
        this.router.navigateByUrl('/admin');
        break;
      case 'teacher':
        this.router.navigateByUrl('/dashboard');
        break;
      case 'student':
        this.router.navigateByUrl('/qrscanner');
        break;
      default:
        this.router.navigateByUrl('/login');
        break;
    }
  }
  
  async updateUserData(data: User): Promise<void> {
    const auth = getAuth(this.app);
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }
    try {
      await updateProfile(currentUser, data);
      const userRef = doc(getFirestore(this.app), 'usuarios', currentUser.uid);
      const dataPlainObject = JSON.parse(JSON.stringify(data));
      await updateDoc(userRef, dataPlainObject);
    } catch (error: any) {
      console.error(error);
    }
  }

  async recoveryPassword(email: string): Promise<void> {
    const auth = getAuth(this.app);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error(error);
    }
  }
}