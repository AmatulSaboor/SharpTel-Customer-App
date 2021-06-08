import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
    if(this.dataservice.getSignedInInfo != null){
      var a = this.dataservice.getSignedInInfo();
      console.log(a);
    }
  }
}

