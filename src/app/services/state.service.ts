import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  private curso = new BehaviorSubject<Course | null>(null)
  private user = new BehaviorSubject<User | null>(null)

  db: Firestore = inject(Firestore);

  async login(username: string, password: string): Promise<User | null> {
    const userCollection = collection(this.db, 'usuarios');
    const userQuery = query(userCollection, where('username', '==', username), where('password', '==', password));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const user = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() } as User;
      this.setIsLoggedIn(true);
      this.setCurrentUser(user);
      return user;
    }

    return null;
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  logout() {
    this.setIsLoggedIn(false);
    this.user.unsubscribe();
  }

  setCurso(curso: any) {
    this.curso.next(curso);
  }

  getCurso() {
    return this.curso.asObservable();
  }

  getCurrentUser() {
    return this.user.asObservable();
  }

  setCurrentUser(user: User) {
    if (!this.user.isStopped) {
      this.user.next(user);
    }
  }

  constructor() { }
}