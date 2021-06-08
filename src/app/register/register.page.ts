import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../Services/dataservice.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //User:any;
  User: any = {UserName: "", CompanyName: "", PhoneNo: "", Email :  "", Password : "", ConfirmPassword: ""};          //TODO: change it to none-type instead of empty string
  Response: any = {IsSuccessful: false, CustomerInfo: {}, ValidationErrors: [] }
  constructor(private http : HttpClient, public route:Router, public dataservice : DataserviceService, public toastController: ToastController) { }

  ngOnInit() {
  }
  // ================================= register user function ====================================
  RegisterUser(User){
    // if(User.UserName == null || User.UserName == "" || User.Email == null || User.Email == "" || User.CompanyName == "" || User.CompanyName == null || User.PhoneNo == "" || User.PhoneNo == null|| User.Password == "" || User.Password == null || User.ConfirmPassword == "" || User.ConfirmPassword == null){
    //   this.dataservice.presentToast("None Of The Fields Can Be Empty", 2000)
    // }
    // else if(User.Password != User.ConfirmPassword){
    //   this.dataservice.presentToast("Password and Confirm Password should match", 2000);
    // }
    // else{
        this.http.post('http://192.168.15.2:5050/api/LogInCustomerAppApi/Register', User).subscribe(resp =>
        {
          this.Response = resp;
          if (this.Response.isSuccessful)
          {
            this.dataservice.setSignedInInfo(this.Response.CustomerInfo);
            var a = this.dataservice.getSignedInInfo();
            console.log(a);
            this.dataservice.presentToast("Successfully Registered", 2000);
            this.route.navigate(['/home']);
          }
        else{
          this.dataservice.presentToast(this.Response.ValidationErrors[0], 2000)
          console.log(this.Response.ValidationErrors);}
        });
    }
  }

