import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  slicedPlaces: Place[];
  constructor
    // tslint:disable-next-line: space-before-function-paren
    (
      private placesService: PlacesService
    ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.getPlaces();
    this.slicedPlaces = this.loadedPlaces.slice(1);
  }

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
