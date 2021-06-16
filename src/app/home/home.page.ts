/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
    if(this.dataservice.getSignedInInfo != null){
      var a = this.dataservice.getSignedInInfo();
      console.log(a);
    }
    else{
      console.log("user info not available");
    }
  }
}
