import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IOffer } from '../models/offer';
import { ISubscription } from '../models/subscription';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  API = 'https://selfcare-service.test.melita.com/interview/backend/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOffers = (): any => {
    let token = this.authService.getAuthToken();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');

    return this.http.get<IOffer>(this.API + '/offers', { headers });
  };

  getSubscriptions = (id: number): Observable<ISubscription> => {
    let token = this.authService.getAuthToken();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');

    return this.http.get<ISubscription>(
      this.API + `/offers/${id}/subscriptions`,
      {
        headers,
      }
    );
  };
}
