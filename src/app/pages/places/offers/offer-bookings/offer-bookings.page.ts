import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  offer: Place;

  constructor(
    private placesService: PlacesService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId = paraMap.get('placeId');
      console.log(placeId);
      this.offer = this.placesService.getPlace(placeId);
    });
  }



}
