import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  loginAPI =
    'https://selfcare-service.test.melita.com/interview/backend/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login = (login: ILogin) => {
    this.http.post(this.loginAPI, login).subscribe((data: any) => {
      this.saveTokenToLocalStorage(data.authToken);
    });
  };

  saveTokenToLocalStorage = (token: string) => {
    try {
      window.localStorage.setItem('authToken', token);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(
        'An error occured while trying to save your token, please try again',
        error
      );
    }
  };
}
