/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataserviceService } from '../Services/dataservice.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-addquery',
  templateUrl: './addquery.page.html',
  styleUrls: ['./addquery.page.scss'],
})
export class AddqueryPage implements OnInit {
  query:string = "";
  custInfo:any;
  customerQuery = {customerId: 0, query : this.query};
  constructor(private route: Router, private dataservice: DataserviceService, private alertCtrl : AlertController, private http : HttpClient) {
    this.custInfo = this.dataservice.getSignedInInfo();
    this.customerQuery.customerId = this.custInfo.CustomerId;
    console.log("in add query page");
    console.log(this.custInfo);
    console.log(this.customerQuery.customerId);
   }

  ngOnInit() {

  }

  clearQueryText(){
    this.query = "";
  }
  async addQuery(){
    await this.dataservice.presentLoading();
    this.custInfo = this.dataservice.getSignedInInfo();
    this.customerQuery.customerId = this.custInfo.CustomerId;
    this.customerQuery.query = this.query;
    console.log(this.customerQuery);
    if (this.query != ""){
      this.http.post('https:/localhost:44387/api/CustomerQueryCustomerAppApi/addQuery', this.customerQuery).pipe(
        finalize(async() => {
          await this.dataservice.loading.dismiss();
        })
        )
        .subscribe(resp =>
      { if (resp == true)
        {
          // this.queryButtonText = "Add Another Query!";
          // this.presentAlertConfirm();
          // this.hideQueryBox();
          this.query = "";
          console.log("query has been added succesfully");
          this.dataservice.presentToast("Query has been added successfully, you'll be contacted soon!", 3000);
          this.route.navigate(['/home']);
        }
      else{
        this.dataservice.presentToast("There was an error in generating your query, please try again!", 3000);}
        });
    }
    else{
      console.log("empty string");
      this.dataservice.presentToast("You must enter a query inorder to submit it", 2000);
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
    //cssClass: 'my-custom-class',
    header: 'Success!',
    message: "Your query has been added suceessfully. You'll be contacted soon!!!",
    buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        //cssClass: 'secondary',
        handler: (blah) => {
          console.log('Query added: blah');
        }
      }
    ]
  });

  await alert.present();
}

}
