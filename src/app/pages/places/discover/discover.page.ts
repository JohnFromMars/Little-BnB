import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  slicedPlaces: Place[];
  private subscription: Subscription;


  constructor(
    private placesService: PlacesService
  ) { }

  /**
   * Subscribe the places service
   */
  ngOnInit() {
    this.subscription = this.placesService.getPlaces().subscribe(
      places => {
        this.loadedPlaces = places;
        this.slicedPlaces = places.slice(1);
      }
    );
  }
  /**
   * Unsubscribe the places service when the componet is destroyed
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * update the place list when view enter
   */
  // ionViewWillEnter() {
  //   this.loadedPlaces = this.placesService.getPlaces();
  //   this.slicedPlaces = this.loadedPlaces.slice(1);
  // }

  /**
   * Change the fiter data based on segment button
   */
  onChangeFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
    switch (event.detail.value) {
      case 'all':

        break;
      case 'bookable':

        break;
    }
  }

}
