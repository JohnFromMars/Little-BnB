import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from 'src/app/models/place';
import { PlacesService } from 'src/app/services/places.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/components/create-booking/create-booking.component';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: Place;
  private subscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      // get th place ID via param map
      const placeId = paraMap.get('placeId');
      // get the place object via place ID
      this.placesService.getPlace(placeId).subscribe(place => {
        this.place = place;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navController.navigateBack('/places/tabs/discover');
    this.actionSheetController.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });

  }

  /**
   * open the modal
   * modalcomponent: create booking component
   */
  openModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalController.create({
      component: CreateBookingComponent,
      // passing argument: place and mode
      componentProps: { bookPlace: this.place, selectedMode: mode }

    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();

    }).then(
      resultData => {
        console.log(resultData.data + ' ' + resultData.role);
      });
  }
}
