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
    var blog;
    this.blogJson = JSON.parse(data);
    console.log(this.blogJson);
  }

  blogsTaker(id){
    //setting URL
    var url = "http://localhost:8000/api/blogs";
    if(id>0) url+=id.toString();
    //send GET
    let vm = this;
    console.log(url);
    this.http.get(url)
      .toPromise()
      .then((response) =>
      {
        vm.blogsShower(response['_body']);
      })
      .catch((error) =>
      { 
        console.error('API Error : ', error.status);
        console.log(url);
      });
  }

  blogPoster(title, body){
    var url = "http://localhost:8000/api/blogs/";
    //var url = "http://localhost:8000/api/chats/test";
    var data = JSON.stringify({
      title: title,
      body: body,
      user_id: this.userID
    })
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let vm = this;
    this.http.post(url, data, options)
      .toPromise()
      .then((response) =>
      {
        console.log("result:",response['_body']);
        vm.presentAlert("Posted", "");
      })
      .catch((error) =>
      { 
        console.error('API Error : ', error.status);
        vm.presentAlert("Error", "Unknown");
      });
  }

  

  __blogPoster(title, body){
    var url = "http://localhost:8000/api/blogs/";
    /*var data = JSON.stringify({
      title: title,
      body: body,
      user_id: this.userID
    })*/
    var data = "title="+title
      +"&body="+body
      +"&user_id="+this.userID.toString();
    console.log(data);
    let vm = this;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) {
        vm.presentAlert("Posted", "");
      }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
    return xhr;
  }

}

/*
__blogsTaker(id){
    var url = "http://localhost:8000/api/blogs/";
    if(id>0) url+=id.toString();
    console.log(url);
    let vm = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) {
        vm.blogsShower(xhr.responseText);
      }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    return xhr;
  }


 */