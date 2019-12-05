import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController } from '@ionic/angular';
import { timeout } from 'q';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navController: NavController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
  }

  /**
   * On login button
   */
  onLogin() {
    // Use loading controller to block any action from user
    this.loadingController.create(
      {
        keyboardClose: true,
        message: 'Login in...',

      }).then(loadingEl => {
        // present loading controller and login
        loadingEl.present();
        this.authService.loging();

        setTimeout(() => {
          loadingEl.dismiss();
          // redirect to discover page
          this.navController.navigateForward('/places/tabs/discover');

        }, 1500);

      });
  }


}
