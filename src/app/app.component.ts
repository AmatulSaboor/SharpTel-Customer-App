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
    { title: 'My Profile', url: '/userprofile', icon: 'mail' },
    { title: 'Add Ticket', url: '/folder/utboxO', icon: 'paper-plane' },
    { title: 'Add Query', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Ticket History', url: '/folder/Archived', icon: 'archive' },
    { title: 'About SharpTel', url: '/aboutsharptel', icon: 'trash' },
    { title: 'Contact Us', url: '/aboutsharptel', icon: 'heart' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    constructor(private events: EventsService, private route: Router, private dataservice: DataserviceService) {
    this.initApp();
  }

  initApp(){

    this.events.getObservable().subscribe((data) => {
      console.log("Data received:", data);
      this.UserId = data.User.CustomerId;
      this.UserName = data.User.CustomerName;
      this.UserEmail = data.User.Email;
    })
    if (this.dataservice.getSignedInInfo() == null){
      console.log("already signed in");
      console.log(this.dataservice.getSignedInInfo());
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
