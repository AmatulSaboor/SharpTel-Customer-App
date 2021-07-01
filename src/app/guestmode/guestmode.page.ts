/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataserviceService } from '../Services/dataservice.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-guestmode',
  templateUrl: './guestmode.page.html',
  styleUrls: ['./guestmode.page.scss'],
})
export class GuestmodePage implements OnInit {
  isHidden = false;
  query: string = "";
  queryButtonText = "Add Query";
  guestId = this.dataservice.getGuestId();
  Guest = {GuestId : this.dataservice.getGuestId(), GuestQuery: this.query};
  constructor(private alertCtrl: AlertController, private dataservice: DataserviceService, private http : HttpClient, public route:Router) { }

  ngOnInit() {
  }

  showQueryBox(){
    this.isHidden = !this.isHidden;
  }

  hideQueryBox(){
      this.isHidden = false;
  }

  clearQueryText(){
    this.query = "";
  }

  closeModal(){
    this.dataservice.removeUserType();
    this.dataservice.removeGuestId();
    this.route.navigate(['/folder']);
  }

  async addQuery(){
    if (this.query != ""){
      this.Guest.GuestQuery = this.query;
      await this.dataservice.presentLoading();
      this.http.post('https:/localhost:44387/api/GuestQueryCustomerAppApi/addQuery', this.Guest).pipe(
        finalize(async() => {
          await this.dataservice.loading.dismiss();
        })
        )
        .subscribe(resp =>
      { if (resp)
        {
          this.queryButtonText = "Add Another Query!";
          this.presentAlertConfirm();
          this.hideQueryBox();
          console.log("alert have been shown");
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
