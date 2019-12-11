import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';
import { NavController, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  loadedOffers: Place[];
  private subscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private navController: NavController
  ) { }

  /**
   * Unsubscrie the service when the component is destroyed
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.placesService.getPlaces().subscribe(places => {
      this.loadedOffers = places;
    });
  }

  onEdit(id: string, ionItem: IonItemSliding) {
    ionItem.close();
    this.navController.navigateForward('/places/tabs/offers/edit/' + id);
  }

}
