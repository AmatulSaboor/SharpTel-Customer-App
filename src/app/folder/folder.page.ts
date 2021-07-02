/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import { GuestmodalPage } from '../guestmodal/guestmodal.page';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../Services/dataservice.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  constructor(public dataservice: DataserviceService, private http:HttpClient, public route:Router, public nav:NavController,
     private modalCtrl : ModalController, private activatedRoute: ActivatedRoute) { }
     GuestInfo = {name :  "", phoneNo: "", city : "", email : "", isSubmit:null};
     Response : any = {ValidationErrors: [], isSuccessful : false, GuestId : 0};
  // eslint-disable-next-line max-len
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: GuestmodalPage
    });

    await modal.present();
    console.log("after dismiss function");
    const { data } = await modal.onWillDismiss();
    this.GuestInfo = data;
    if(this.GuestInfo.isSubmit)
    {
      this.addGuestToDatabase(this.GuestInfo);
      console.log("the guest id is: " + this.Response.GuestId);
    }
    else{
      console.log("closed by clsoed model function");
      this.route.navigate(['/folder']);
    }

    }

    async addGuestToDatabase(guestInfo) {
      await this.dataservice.presentLoading();
      this.http.post('https://180.178.129.150:443/api/GuestQueryCustomerAppApi/addGuest', guestInfo).pipe(
        finalize(async() => {
          await this.dataservice.loading.dismiss();
        })
        )
        .subscribe(resp =>
    { this.Response = resp;
      if(this.Response.isSuccessful == true)
      {
        console.log("yeahhhhh");
        console.log(this.Response.GuestId);
        this.dataservice.setUserType('guest');
        this.dataservice.setGuestId(this.Response.GuestId);
        this.route.navigate(['/guestmode']);
      }
      else
        console.log("something wrong");
        this.dataservice.presentToast(this.Response.ValidationErrors[0], 3000);
      },
     );
    }

}
