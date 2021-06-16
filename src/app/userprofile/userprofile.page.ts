/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../Services/dataservice.service';
import { EventsService } from '../Services/events.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  customerInfo:any = {CustomerId : null, CustomerName : "", CompanyName : "", PhoneNo : "", Email : ""};
  isEditable = false;
  Response :any;
  constructor(private events: EventsService, private http: HttpClient, private dataservice: DataserviceService) { }

  ngOnInit() {
     this.customerInfo = this.dataservice.getSignedInInfo();
  }
  toggleEditingMode(){
    this.isEditable = !this.isEditable;
  }

  editUser(){
    console.log(this.customerInfo);

    this.http.post('https:/localhost:44387/api/CustomerProfileAppApi/editCustomer', this.customerInfo).subscribe(resp =>
      { this.Response = resp;
        console.log(resp);
        console.log(this.Response);
        if (this.Response.isSuccessful)
        {
          this.customerInfo = this.Response.CustomerInfo;
          console.log(this.customerInfo);
          this.dataservice.presentToast("Changes have been saved", 3000);
          this.dataservice.setSignedInInfo(this.customerInfo);
          console.log(this.dataservice.getSignedInInfo());
          this.toggleEditingMode();
          this.events.publishSomeData({
            User: this.Response.CustomerInfo
          });
        }
      else{
        this.dataservice.presentToast(this.Response.ValidationErros[0], 2000);
        console.log("cahnges in failure");
      }
        });
  }
}
