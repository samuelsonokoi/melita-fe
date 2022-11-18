import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authservice: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authservice.getAuthToken();
    try {
      if (isLoggedIn) {
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
    } catch (error) {
      return this.router.navigate(['/login']);
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authservice.getAuthToken();
    try {
      if (isLoggedIn) {
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
    } catch (error) {
      return this.router.navigate(['/login']);
    }
  }
}
