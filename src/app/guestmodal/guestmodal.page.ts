import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guestmodal',
  templateUrl: './guestmodal.page.html',
  styleUrls: ['./guestmodal.page.scss'],
})
export class GuestmodalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeModel(){
    console.log("closed modal");
  }

}
