import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOffer } from 'src/app/models/offer';
import { ISubscription } from 'src/app/models/subscription';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
  subscriptions!: ISubscription[];
  sub!: Subscription;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private offersService: OffersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    // use a subscription to handle the observable so it can be unsubscribed from on ngOnDestroy
    this.sub = this.offersService
      .getSubscriptions(this.id)
      .subscribe((data: any) => {
        this.subscriptions = data.subscriptions;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  back = () => {
    this.router.navigate(['/']);
  };
}
