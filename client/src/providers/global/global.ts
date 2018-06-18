import { Injectable } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


import { GlobalPage } from '../../pages/global/global';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    ) {
    console.log('Hello GlobalProvider Provider');
  }

  public userID = 0;
  public userName = "Con Ma Xau";
  public email = "";
  public guestID = 0;
  public guestName = "Con Ma Xau";
  public blogsData = "";
  public blogJson =[];

  public presentAlert(alertTitle, alertBody) {
    let alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertBody,
      buttons: ['OK']
    });
    alert.present();
  }

  blogsShower(data){
    this.blogJson = JSON.parse(data['_body']);
  }

  async blogsTaker(id){
    //setting URL
    var url = "http://localhost:8000/api/blogs/";
    if(id>0) url+=id.toString();
    //send GET
    let response = await this.http.get(url).toPromise();
    this.blogsShower(response)
  }

  async blogPoster(title, body){
    var url = "http://localhost:8000/api/blogs/";
    //var url = "http://localhost:8000/api/chats/test";
    var data = "title="+title
      +"&body="+body
      +"&user_id="+this.userID.toString();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let response = await this.http.post(url, data, options).toPromise();
    this.presentAlert("POSTED", "");
  }
}

/*


 */