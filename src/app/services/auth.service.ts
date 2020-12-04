import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  createUser(user) {
    console.log('authService: createUser');
    console.log(user);
  }
}
