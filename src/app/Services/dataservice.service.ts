import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(public toastController: ToastController) { }
  getSignedInInfo(){
    return JSON.parse(localStorage.getItem("SignedInUser"));
  }
  setSignedInInfo(user){
    localStorage.setItem("SignedInUser", JSON.stringify(user));
    // this.CurrentUser = data;
  }
  async presentToast(Message : string, Duration : number) {
    const toast = await this.toastController.create({
      message: Message,
      duration: Duration,
      position: 'middle'
    });
    toast.present();
  }

}
