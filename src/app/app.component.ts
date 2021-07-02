/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from './Services/dataservice.service';
import { EventsService } from './Services/events.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  UserId:any;
  UserName:any;
  UserEmail:any;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'My Profile', url: '/userprofile', icon: 'person-circle' },
    { title: 'Add Ticket', url: '/addticket', icon: 'duplicate' },
    { title: 'Business Query', url: '/addquery', icon: 'ticket' },
    { title: 'Ticket History', url: '/tickethistory', icon: 'layers' },
    { title: 'About SharpTel', url: '/aboutsharptel', icon: 'grid' },
    { title: 'Contact Us', url: '/contactus', icon: 'call' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    userInfo = {CustomerId: 0, CustomerName: "", Email: ""};
    constructor(private events: EventsService, private route: Router, private dataservice: DataserviceService) {
      console.log("inside app.comp page constructor");
      this.initApp();
  }
  ionViewWillEnter(){
    console.log("inside ion view will enter app.compo");

  }

  initApp(){
      console.log("inside initApp fucntion");


    //   this.events.getObservable().subscribe((data) => {
    //   console.log("Data received:", data);
    //   this.UserId = data.User.CustomerId;
    //   this.UserName = data.User.CustomerName;
    //   this.UserEmail = data.User.Email;
    // })
    if(this.dataservice.getSignedInInfo() != null){
      console.log(this.UserName + this.UserEmail);
      console.log("already signed in");
      console.log(this.dataservice.getSignedInInfo());
      this.userInfo = this.dataservice.getSignedInInfo();
      console.log(this.userInfo);
      this.UserId = this.userInfo.CustomerId;
      this.UserName = this.userInfo.CustomerName;
      this.UserEmail = this.userInfo.Email;
      this.route.navigate(['/home']);
    }
    else{
      console.log("not signed in");
      this.route.navigate(['/folder']);
    }
  }

  logout(){
    this.dataservice.logout();
  }
}
