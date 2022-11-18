import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOffer } from 'src/app/models/offer';
import { AuthService } from 'src/app/services/auth.service';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  offers!: IOffer[];
  sub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private offersService: OffersService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };
}
