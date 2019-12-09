import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/models/place';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() bookPlace: Place;
  @Input() selectedMode: string;
  @ViewChild('bookingForm', null) bookingForm: NgForm;
  startDate: string;
  endDate: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    const avalableFrom = new Date(this.bookPlace.availableFrom);
    const avalableTo = new Date(this.bookPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(avalableFrom.getTime() + Math.random() * avalableTo.getTime() - 7 * 24 * 60 * 60 * 1000
        - avalableFrom.getTime()).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() +
        Math.random() * 7 * 24 * 60 * 60 * 1000 - avalableTo.getTime()).toISOString();
    }
  }

  /**
   * confirm booking, send the booking data back to place detail
   */
  onBook() {
    if (!this.bookingForm.valid) {
      return;
    }
    this.modalController.dismiss(
      {
        bookingData:
        {
          firstName: this.bookingForm.value['first-name'],
          lastName: this.bookingForm.value['last-name'],
          guestNumnber: this.bookingForm.value['guest-number'],
          checkin: this.bookingForm.value['checkin-date'],
          checkout: this.bookingForm.value['checkout-date']
        }
      },
      'confirm');
  }

  /**
   * close the modal
   */
  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  /**
   * Validate the checkin date and checkout date
   * the checkin date must prior than checkout date
   */
  validateDate() {
    const checkout = new Date(this.bookingForm.value['checkout-date']);
    const checkin = new Date(this.bookingForm.value['checkin-date']);
    console.log(checkin);
    console.log(checkin)
    return checkin < checkout;
  }

}
