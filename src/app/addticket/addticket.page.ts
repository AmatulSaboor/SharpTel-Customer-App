import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../Services/dataservice.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.page.html',
  styleUrls: ['./addticket.page.scss'],
})
export class AddticketPage implements OnInit {
  public custInfo:any;
  Ticket: any ={customerID: null, linkname: "", poc: "", email: "", attachement : "", remarks: "", issueType : "Other", customIssueType: ""};
  Responseattachement
  issueTypes: any = ["No browsing", "Slow browisng", "Packet Loss", "Internet Issue", "Other"];
  constructor(private route: Router, private dataservice: DataserviceService, private http : HttpClient) {
    console.log(this.dataservice.getSignedInInfo());
      this.custInfo = this.dataservice.getSignedInInfo();
      this.Ticket.customerID = this.custInfo.CustomerId;
      console.log("in add ticket page");
      console.log(this.custInfo);
      console.log(this.Ticket.customerID);

  }

  ngOnInit() {

  }

  async addTicket(){
    console.log(this.Ticket);

    if (this.Ticket.linkname != "" && this.Ticket.poc != "" && this.Ticket.email != "" && this.Ticket.remarks != "" && this.Ticket.attachement != "" && this.Ticket.issueType != "" ){
      if(this.Ticket.issueType == "Other" ){
        if(this.Ticket.customIssueType == ""){
          this.dataservice.presentToast("Please type your custom issue type", 3000);
          return;
        }
        else{
          this.Ticket.issueType = this.Ticket.customIssueType;
        }
      }
      await this.dataservice.presentLoading();
      this.custInfo = this.dataservice.getSignedInInfo();
      this.Ticket.customerID = this.custInfo.CustomerId;
      this.http.post('https:/localhost:44387/api/TicketQueryCustomerAppApi/addTicket', this.Ticket).pipe(
        finalize(async() => {
          await this.dataservice.loading.dismiss();
        })
        )
        .subscribe(resp =>
        { if (resp == true)
            {
            // this.presentAlertConfirm();
            console.log("ticket has been added succesfully");
            this.dataservice.presentToast("Tikcet has been added successfully, you'll be contacted soon!", 3000);
            this.route.navigate(['/home']);
          }
        else{
          this.dataservice.presentToast("There was an error in generating your tikcet, please try again!", 3000);}
          });
  }
    else{
      this.dataservice.presentToast("Please fill all the fields", 3000);
    }
  }
}
