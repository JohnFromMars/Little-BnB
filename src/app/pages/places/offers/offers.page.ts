import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';
import { NavController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedOffers: Place[];

  constructor(
    private placesService: PlacesService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.loadedOffers = this.placesService.getPlaces();
  }

  ionViewWillEnter() {
    this.loadedOffers = this.placesService.getPlaces();
  }

  onEdit(id: string, ionItem: IonItemSliding) {
    ionItem.close();
    this.navController.navigateForward('/places/tabs/offers/edit/' + id);
  }

}
