import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([
    new Place(
      '1',
      'Vacation Beach House', 'Nice to visit',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg',
      200,
      new Date('2019-11-26'),
      new Date('2020-02-11'),
      'abc'
    ),
    new Place(
      '2',
      'Madison House',
      'Nice to visit',
      'https://images.pexels.com/photos/1685042/pexels-photo-1685042.jpeg?cs=srgb&dl=architecture-barrel-daylight-1685042.jpg&fm=jpg',
      150,
      new Date('2019-11-27'),
      new Date('2020-02-20'),
      'abc'
    ),
    new Place(
      '3',
      'Froggy House',
      'Amazing trip you will ever have',
      'https://images.pexels.com/photos/363889/pexels-photo-363889.jpeg?cs=srgb&dl=architecture-bricks-building-daylight-363889.jpg&f' +
      'm=jpg',
      150,
      new Date('2019-08-26'),
      new Date('2020-02-11'),
      'abc'
    ),
    new Place(
      '4',
      'Beautiful House',
      'Amazing trip you will ever have',
      // tslint:disable-next-line: max-line-length
      'https://images.pexels.com/photos/259957/pexels-photo-259957.jpeg?cs=srgb&dl=architecture-brick-building-construction-259957.jpg&fm=jpg',
      150,
      new Date('2019-09-26'),
      new Date('2020-02-11'),
      'abc'
    )
  ]);


  constructor(
    private authService: AuthService
  ) { }

  /**
   * Get all places
   */
  getPlaces() {
    return this.places.asObservable();
  }

  /**
   * Get the place by ID
   * @param placeId the ID of place
   */
  getPlace(placeId: string) {
    return this.places.pipe(take(1), map(places => {
      return places.find(p => {
        return p.id === placeId;
      });
    }));

  }

  /**
   * Add a new place
   * 
   * @param title title of new place
   * @param description description of new place
   * @param price price per night
   * @param availableForm avaailble from when
   * @param availableTo available to when
   */
  addPlace(title: string, description: string, price: number, availableForm: Date, availableTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title, description,
      'https://images.pexels.com/photos/259957/pexels-photo-259957.jpeg?' +
      'cs=srgb&dl=architecture-brick-building-construction-259957.jpg&fm=jpg',
      price,
      availableForm,
      availableTo,
      this.authService.getUserId()
    );

    this.places.pipe(take(1)).subscribe(
      places => {
        this.places.next(places.concat(newPlace));
      });
  }
}
