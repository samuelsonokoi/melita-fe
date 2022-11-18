import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API = 'https://selfcare-service.test.melita.com/interview/backend/api';

  constructor(private http: HttpClient, private router: Router) {}

  login = (login: ILogin) => {
    this.http.post(this.API + '/login', login).subscribe((data: any) => {
      this.saveTokenToLocalStorage(data.authToken);
      this.router.navigate(['/']);
    });
  };

  logout = () => {
    this.http.get(this.API + '/logout').subscribe((data: any) => {
      this.removeTokenFromLocalStorage();
      this.router.navigate(['/login']);
    });
  };

  saveTokenToLocalStorage = (token: string) => {
    try {
      window.localStorage.setItem('authToken', token);
    } catch (error) {
      console.log(
        'An error occured while trying to save your token, please try again',
        error
      );
    }
  };

  removeTokenFromLocalStorage = () => {
    try {
      window.localStorage.removeItem('authToken');
    } catch (error) {
      console.log(
        'An error occured while trying to log you out, please try again',
        error
      );
    }
  };

  getAuthToken = () => {
    return window.localStorage.getItem('authToken');
  };
}
