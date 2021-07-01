import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController } from '@ionic/angular';
import { DataserviceService } from '../Services/dataservice.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
  providers : [File, CallNumber, EmailComposer, FileChooser, FileTransferObject, FileTransfer]
})
export class ContactusPage implements OnInit {

  constructor(private dataservice: DataserviceService, private loadingCtrl: LoadingController, private transfer: FileTransfer, private file :File, private callNumber: CallNumber, private emailComposer: EmailComposer, private fileChooser : FileChooser) {

   }
  fileTransfer: FileTransferObject = this.transfer.create();

  ngOnInit() {
  }

  callUs(){
    this.callNumber.callNumber("00923111284373", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  emailUs(){
    this.emailComposer.open({
      to : 'servicedesk@sharptel.pk',
      subject: 'Customer Query'
    })
  }
  download() {
    console.log("inside download function");
    const url = 'https://bayyinahhandouts.s3-us-west-2.amazonaws.com/update_handouts_dww/Bayyinah+Dream+Live+Brochure_8.27.20.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log("couldn't load the pdf");
      console.log(error);
    });
  }

  chooseFile(){
    console.log("inside choosefile sendimage function");
    this.fileChooser.open()
    .then(uri => {
      console.log(uri);
      this.sendImage(uri);})
    .catch(e => console.log(e));
  }
  chooseFile2(){
    console.log("inside choosefile uploadimage function");
    this.fileChooser.open()
    .then(uri => {
      console.log(uri);
      this.upload(uri);})
    .catch(e => console.log(e));
  }


  upload(uri) {
    console.log("inside upload fucntion");
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'name.jpg',
       headers: {}
    }

    this.fileTransfer.upload(uri, "https:/localhost:44387/FileUploaderCustomerAppApi/UploadImages", options)
     .then((data) => {
       // success
       console.log(data);
       console.log("uploaded the file");
     }, (err) => {
       // error
       console.log("couldn't upload the file");
       console.log(err);
     })
  }

   async sendImage (uri){
    // let loader = this.loadingCtrl.create({
    //   message: "Uploading..."
    // });
    // await loader.present();
    await this.dataservice.presentLoading();
    let filename = uri.split('/').pop();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { 'title': "Testing Image" }
    };

    fileTransfer.upload(uri, "https:/localhost:44387/FileUploaderCustomerAppApi/UploadImages",options).then((res)=>{
      console.log("image has been added to DB successfully");
        console.log(res);
    },(err)=>{
      console.log(err);
    });
    }
  }
  // https://180.178.129.150:9090
  //https:/localhost:44387
