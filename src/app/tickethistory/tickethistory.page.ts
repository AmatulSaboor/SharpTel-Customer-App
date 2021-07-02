import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../Services/dataservice.service';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickethistory',
  templateUrl: './tickethistory.page.html',
  styleUrls: ['./tickethistory.page.scss'],
})
export class TickethistoryPage implements OnInit {
  customerID : any;
  customerInfo: any;
  ticketList : any;
  response: any;
  listIsEmpty = false;
  constructor(private dataservice: DataserviceService, private http: HttpClient, private route: Router) {

   }

  ngOnInit() {
  }
  ionViewWillEnter(){
    console.log("inside ion view will enter");
    console.log("inside ticket history page");
    this.customerInfo = this.dataservice.getSignedInInfo();
    this.customerID = this.customerInfo.CustomerId;
    console.log(this.customerID);
    this.getTicketHistory();
    }
  async getTicketHistory(){

    await this.dataservice.presentLoading();
    var link = "https://180.178.129.150:443/api/TicketQueryCustomerAppApi/getTicketHistory?customerID=" + this.customerID;
    this.http.get(link).pipe(
      finalize(async() => {
        await this.dataservice.loading.dismiss();
      })
      )
      .subscribe(resp =>
    {
      this.response = resp;

      if (this.response.isSuccessful){
        if (this.response.ticketDetailsList.length == 0){
          this.listIsEmpty = true;
          console.log("list is empty");
        }
        else{
          console.log("got ticket history");
          console.log(resp);
          this.ticketList = this.response.ticketDetailsList;
        }
      }
      else
      console.log("didnt get history");

    //     this.route.navigate(['/home']);
    //   }
    // else{
    //   this.dataservice.presentToast(this.Response.ValidationErrors[0], 2000)
    //   console.log(this.Response.ValidationErrors);}
    });
  }
}
