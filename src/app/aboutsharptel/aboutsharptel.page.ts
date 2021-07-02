/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-aboutsharptel',
  templateUrl: './aboutsharptel.page.html',
  styleUrls: ['./aboutsharptel.page.scss'],
})
export class AboutsharptelPage implements OnInit {
  images = ['SahrptelLogo.png', 'groupphoto.png'];
  userType: any;
  constructor(private dataservice: DataserviceService) {
   }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isCustomer();
    console.log("inside about sharptel page");
  }

  isCustomer(){
    console.log("inside is cusotomer function");
   this.userType = this.dataservice.getUserType();
   console.log(this.userType);
  }
}
