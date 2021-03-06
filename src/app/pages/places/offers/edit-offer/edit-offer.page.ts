import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  offer: Place;
  form: FormGroup;
  private sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) { }

  ngOnDestroy() {
    // unsubscribe
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      // if there is no id provided then go back to offers page
      if (!paraMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId = paraMap.get('placeId');
      // subscribe the lates offer
      this.sub = this.placesService.getPlace(placeId).subscribe(offer => {
        this.offer = offer;
      });
      // init the form
      this.initForm();
    });
  }

  /**
   * create the form controller for input field, and set the default value from offer
   */
  initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.offer.title, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      description: new FormControl(this.offer.description, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(130)]
      }),
      price: new FormControl(this.offer.price, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(this.offer.availableFrom.toISOString(), {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(this.offer.availableTo.toISOString(), {
        updateOn: 'change',
        validators: [Validators.required]
      })

    });
  }

  /**
   * This method get and save the updated offer value
   */
  onSubmitOffer() {
    // if the form is invalid then return
    if (!this.form.valid) {
      return;
    }

    console.log('onSubmitOffer');
    console.log(this.form);
  }
}
