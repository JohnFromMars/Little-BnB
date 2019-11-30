import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: Booking[] = [
    new Booking('x', 'p1', 'abc', 3, 'Manhadon House'),

  ]

  constructor() { }

  getBookings() {
    return [...this.bookings];
  }
}
