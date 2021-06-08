import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  User = {UserName :  "", Password : "", RememberMe: false};    //TODO: change it to none-type instead of empty string
  Response: any = {IsSuccessful: false, CustomerInfo: {}, ValidationErrors: [] }
  constructor(private http : HttpClient, public route:Router, private dataservice: DataserviceService) { }


  ngOnInit() {
  }
  // ================================= sign in function ====================================
  SignIn(User){
    console.log(User.UserName + User.Password);

    this.http.post('https://localhost:44387/api/LogInCustomerAppApi/Login', User).subscribe(resp =>
    { this.Response = resp;
      console.log(resp);
      console.log(this.Response);
      if (this.Response.isSuccessful)
      {
        this.dataservice.setSignedInInfo(this.Response.CustomerInfo);
        var a = this.dataservice.getSignedInInfo();
        console.log(a);
        this.dataservice.presentToast("Successfully Signed In", 2000);
        this.route.navigate(['/home']);
      }
    else{
      this.dataservice.presentToast(this.Response.ValidationErrors[0], 2000)
      console.log("log in failure");
      console.log(this.Response.ValidationErrors);}
      });
  }
}
