import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginAPI =
    'https://selfcare-service.test.melita.com/interview/backend/api/login';

  constructor(private http: HttpClient) {}

  login = (login: ILogin): boolean => {
    let isSuccess = false;
    this.http.post(this.loginAPI, login).subscribe((data: any) => {
      this.saveTokenToLocalStorage(data.authToken);
      isSuccess = !isSuccess;
    });
    return isSuccess;
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
}
