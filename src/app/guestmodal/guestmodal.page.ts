/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-guestmodal',
  templateUrl: './guestmodal.page.html',
  styleUrls: ['./guestmodal.page.scss'],
})
export class GuestmodalPage implements OnInit {
  Guest = {name : null, phoneNo: "", city : "", email : ""};         // TODO: change null type to a proper value
  constructor(private route: Router, private dataservice: DataserviceService, private modalCtrl: ModalController) { }
  ngOnInit() {
  }

  dismiss() {
    if(this.Guest.name == null || this.Guest.phoneNo == null || this.Guest.city == null, this.Guest.email == null)
    {
      this.dataservice.presentToast("Please fill all the fields!", 3000);
    }
    else{
    this.modalCtrl.dismiss({
      name : this.Guest.name,
      phoneNo : this.Guest.phoneNo,
      city : this.Guest.city,
      isSubmit: true
    });
    }
  }

  closeModal(){
    console.log("inside close modal function");
    this.modalCtrl.dismiss({
      name : "",
      phoneNo : "",
      city : "",
      isSubmit: false
    });
  }
}
