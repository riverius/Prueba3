import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public username = new BehaviorSubject<string>('');
  public typeUser = new BehaviorSubject<string>('');

  login(username: string, password: string): boolean {
    if (username == 'Marcelo' && password == '12345') {
      this.setIsLoggedIn(true);
      this.setUsername(username);
      this.setTypeUser('teacher');
      return true;
    } else if (username == 'Orel' && password == '1234567') {
      this.setIsLoggedIn(true);
      this.setUsername(username);
      this.setTypeUser('student');
      return true;
    }
    return false;
  }

  setTypeUser(value: string) {
    this.typeUser.next(value);
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  setUsername(username: string) {
    this.username.next(username);
  }

  getUsername() {
    return this.username.asObservable();
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  getTypeUser() {
    return this.typeUser.asObservable();
  }

  logout() {
    this.setIsLoggedIn(false);
    this.setUsername('');
  }

  constructor() { }
}
