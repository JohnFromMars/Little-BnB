import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  // reactive form
  form: FormGroup;

  constructor(
    private placeService: PlacesService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)/* price must greater than 1*/]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  /**
   * create button 
   * navigate back to offers page after adding the new place
   */
  onCreateOffer() {
    // block invalid request
    if (!this.form.valid) {
      return;
    }

    console.log(this.form);
    this.placeService.addPlace(
      this.form.get('title').value,
      this.form.get('description').value,
      this.form.get('price').value,
      new Date(this.form.get('dateFrom').value),
      new Date(this.form.get('dateTo').value)
    );

    // clear the form
    this.form.reset();
    // navigate back to offers page
    this.navController.navigateBack('/places/tabs/offers');
  }
}
