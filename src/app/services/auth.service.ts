import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuth = true;
  private userId = 'abc';

  constructor() { }

  loging() {
    this.userAuth = true;
  }

  logout() {
    this.userAuth = false;
  }

  getUserAuth() {
    return this.userAuth;
  }

  getUserId() {
    return this.userId;
  }
}
