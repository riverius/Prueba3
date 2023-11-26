import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public username = new BehaviorSubject<string>('');

  login(username: string, password: string): boolean {
    if (username == 'Marcelo' && password == '12345') {
      this.setIsLoggedIn(true);
      this.setUsername(username);
      return true;
    }
    return false;
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

  logout() {
    this.setIsLoggedIn(false);
    this.setUsername('');
  }

  constructor() { }
}
