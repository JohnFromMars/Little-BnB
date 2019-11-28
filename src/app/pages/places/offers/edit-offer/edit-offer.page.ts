import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  offer: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId = paraMap.get('placeId');
      this.offer = this.placesService.getPlace(placeId);
    });
  }

}
