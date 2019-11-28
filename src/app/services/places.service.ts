import { Injectable } from '@angular/core';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] =
    [
      new Place(
        '1',
        'Vacation Beach House', 'Nice to visit',
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg',
        200),
      new Place(
        '2',
        'Madison House',
        'Nice to visit',
        'https://images.pexels.com/photos/1685042/pexels-photo-1685042.jpeg?cs=srgb&dl=architecture-barrel-daylight-1685042.jpg&fm=jpg',
        150),
      new Place(
        '3',
        'Froggy House',
        'Amazing trip you will ever have',
        'https://images.pexels.com/photos/363889/pexels-photo-363889.jpeg?cs=srgb&dl=architecture-bricks-building-daylight-363889.jpg&f' +
        'm=jpg',
        150)
    ];


  constructor() { }

  getPlaces() {
    return [...this.places];
  }

  getPlace(placeId: string) {
    return {
      ...this.places.find(p => {
        return p.id === placeId;
      })
    };
  }
}
