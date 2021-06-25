/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public loading:any;
  constructor(public loadingController: LoadingController, public alertCtrl: AlertController, public route: Router, public toastController: ToastController) { }

  getSignedInInfo(){
    return JSON.parse(localStorage.getItem("SignedInUser"));
  }
  setSignedInInfo(user){
    localStorage.setItem("SignedInUser", JSON.stringify(user));
  }

  getUserType(){
    return JSON.parse(localStorage.getItem("UserType"));
  }
  setUserType(userType){
    localStorage.setItem("UserType", JSON.stringify(userType));
  }

  removeUser(){
    localStorage.removeItem("SignedInUser");
  }
  removeUserType(){
    localStorage.removeItem("UserType");
  }
  getGuestId(){
    return JSON.parse(localStorage.getItem("GuestId"));
  }
  setGuestId(id){
    localStorage.setItem("GuestId", JSON.stringify(id));
    // this.CurrentUser = data;
  }

  logout(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
      const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Click OK to sign out!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeUser();
            this.removeUserType();
            console.log(this.getUserType);
            console.log("signed in user: " + this.getSignedInInfo());
            this.presentToast("Signed out sucessfully!", 3000);
            this.route.navigate(['/folder']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
        message: 'Loading...'
    });
    // Present the loading controller
    await this.loading.present();
  }

  async presentToast(Message : string, Duration : number) {
    const toast = await this.toastController.create({
      message: Message,
      duration: Duration,
      position: 'top'
    });
    toast.present();
  }

}
