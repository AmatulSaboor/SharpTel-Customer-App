/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(public alertCtrl: AlertController, public route: Router, public toastController: ToastController) { }
  getSignedInInfo(){
    return JSON.parse(localStorage.getItem("SignedInUser"));
  }
  setSignedInInfo(user){
    localStorage.setItem("SignedInUser", JSON.stringify(user));
    // this.CurrentUser = data;
  }
  getGuestId(){
    return JSON.parse(localStorage.getItem("GuestId"));
  }
  setGuestId(id){
    localStorage.setItem("GuestId", JSON.stringify(id));
    // this.CurrentUser = data;
  }
  removeUser(){
    localStorage.removeItem("SignedInUser");
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
            console.log('Confirm Okay');
            console.log(this.getSignedInInfo());
            this.removeUser();
            console.log("signed in user: " + this.getSignedInInfo());
            this.presentToast("Signed out sucessfully!", 3000);
            this.route.navigate(['/folder']);
          }
        }
      ]
    });

    await alert.present();
  }
  // logout(){
  //   this.removeUser();
  //   var a = this.getSignedInInfo();
  //   console.log(a);
  //   this.presentToast("Successfully Logged Out", 3000);
  //   this.route.navigate(['/login']);
  // }
  async presentToast(Message : string, Duration : number) {
    const toast = await this.toastController.create({
      message: Message,
      duration: Duration,
      //position: 'middle'
    });
    toast.present();
  }

}
