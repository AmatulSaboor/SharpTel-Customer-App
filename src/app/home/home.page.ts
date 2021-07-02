/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png'];


  ticketStatus = {isSuccessful : false, Total: null, Opened: null, Closed: null};
  Response: any;
  customerID:any;
  listIsEmpty = false;
  constructor(private http: HttpClient, private dataservice: DataserviceService) {

  }

  ngOnInit() {

  }
  ionViewWillEnter(){
    if(this.dataservice.getSignedInInfo != null){
      var customerInfo = this.dataservice.getSignedInInfo();
      this.customerID = customerInfo.CustomerId;
      console.log(customerInfo);
      console.log("inside home page");
    }
    else{
      console.log("user info not available");
    }

    this.getTicketInfo();
  }
  async getTicketInfo(){
    console.log("inside get ticket info function");
    await this.dataservice.presentLoading();
    var link = "https://180.178.129.150:443/api/GetTicketStatusCustomerAppApi/getTicketStatus?customerID=" +   this.customerID;
    this.http.get(link).pipe(
      finalize(async() => {
        await this.dataservice.loading.dismiss();
      })
      )
      .subscribe(resp =>
     {
      console.log(resp);
      this.Response = resp;
      this.ticketStatus = this.Response;
      if(this.ticketStatus.Total == 0)
        {this.listIsEmpty = true;}
      console.log(this.ticketStatus);
      if(this.ticketStatus.isSuccessful){
        console.log("api is hit successfully");
      }
      else{
        console.log("something wrong!");
      }
    });
  }
}
