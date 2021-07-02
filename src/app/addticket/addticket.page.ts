import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../Services/dataservice.service';
import { finalize } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.page.html',
  styleUrls: ['./addticket.page.scss'],
})
export class AddticketPage implements OnInit {
  public custInfo:any;
  Ticket: any ={customerID: null, linkname: "", poc: "", email: "", attachement : "", remarks: "", issueType : "", customIssueType: ""};
  Responseattachement
  linknames: any = ["Solution Set", "Connectivity"];
  issueTypesConn: any = ["No browsing", "Slow browisng", "Packet Loss", "Internet Issue", "Other"];
  issueTypesSS : any = ["issue 1", "issue 2", "Other"];
  constructor(private alertCtrl: AlertController, private route: Router, private dataservice: DataserviceService, private http : HttpClient) {
      }
  ionViewWillEnter(){
    console.log("inside ion view add ticket");
    console.log(this.dataservice.getSignedInInfo());
    this.custInfo = this.dataservice.getSignedInInfo();
    this.Ticket.customerID = this.custInfo.CustomerId;
    console.log("in add ticket page");
    console.log(this.custInfo);
    console.log(this.Ticket.customerID);
    this.clearFields();
  }
  ngOnInit() {

  }

  async addTicket(){
    console.log(this.Ticket);
      await this.dataservice.presentLoading();
      this.custInfo = this.dataservice.getSignedInInfo();
      this.Ticket.customerID = this.custInfo.CustomerId;
      this.http.post('https://180.178.129.150:443/api/TicketQueryCustomerAppApi/addTicket', this.Ticket).pipe(

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
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async presentAlertConfirm() {

    if (this.Ticket.linkname != "" && this.Ticket.remarks != "" && this.Ticket.issueType != "" ){
      if (this.Ticket.email == "" || this.validateEmail(this.Ticket.email)){
        if(this.Ticket.issueType == "Other" ){
          if(this.Ticket.customIssueType == ""){
            this.dataservice.presentToast("Please type your custom issue type", 3000);
            return;
          }
          else{
            this.Ticket.issueType = this.Ticket.customIssueType;
          }
        }
    const alert = await this.alertCtrl.create({
    header: 'Confirm!',
    message: "Do you want to add ticket?",
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.addTicket();
        }
      }
    ]
  });
  await alert.present();
  }
  else{
    this.dataservice.presentToast("Email address is invalid!" ,3000);
  }
}
   else{
  this.dataservice.presentToast("Please fill all the fields", 3000);
}
}
clearFields(){
  this.Ticket.linkname = "";
  this.Ticket.poc = "";
  this.Ticket.email = "";
  this.Ticket.remarks = "";
  this.Ticket.attachement = "";
  this.Ticket.issueType = "";
  this.Ticket.customIssueType = "";
  }
}
