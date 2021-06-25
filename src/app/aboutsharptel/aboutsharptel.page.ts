/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutsharptel',
  templateUrl: './aboutsharptel.page.html',
  styleUrls: ['./aboutsharptel.page.scss'],
})
export class AboutsharptelPage implements OnInit {
  images = ['SahrptelLogo.png', 'groupphoto.png'];
  userType: any;
  constructor() {
    console.log("inside about sharptel page");
   }

  isConnectivity = false;
  ngOnInit() {

  }
  toggleIsConnectivity(){
    this.isConnectivity = !this.isConnectivity;
    console.log(this.isConnectivity);
  }

}
