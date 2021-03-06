import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from "../../providers/global/global";

import { GlobalPage } from '../global/global'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  @ViewChild('loginUsername') loginUsername;
  @ViewChild('loginPassword') loginPassword;
  @ViewChild('regisUsername') regisUsername;
  @ViewChild('regisPassword') regisPassword;
  @ViewChild('regisRePassword') regisRePassword;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: Http,
    public globalVal: GlobalProvider,
    public stoSave: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.tokenCheck();
  }

  tokenCheck(){
    console.log("Token checking ...");
    this.stoSave.get("token").then(result => {
      console.log("Token: ",result);
      var data = "token="+result;
      //this.presentAlert("HAHA", result);
      this.postAjax('http://localhost:8000/api/users/checktoken', data, "NONE");
    })
    //this.navCtrl.setRoot(GlobalPage);
  }

  presentAlert(alertTitle, alertBody) {
    let alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertBody,
      buttons: ['OK']
    });
    alert.present();
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  hashCode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }

  userInform(data, errorRaise){
    console.log("The hell");
    var dataJson = JSON.parse(data);
    console.log(dataJson);
    if(dataJson.length>0) {
      this.globalVal.userID = dataJson[0]['id'];
      this.globalVal.userName = dataJson[0]['name'];
      this.globalVal.email = dataJson[0]['email'];
      this.stoSave.set('token', dataJson[0]['token']);
      console.log(this.globalVal.email);
      this.navCtrl.setRoot(GlobalPage);
    }
    else if(errorRaise!="NONE") {
      this.presentAlert(errorRaise, '');
    }
  }

  ___postAjax(url, data, success) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      this.http.post(url, data, options)
      .toPromise()
      .then((response) =>
      {
        console.log('API Response : ', response);
      })
      .catch((error) =>
      { 
        console.error('API Error : ', error.status);
        console.log(url, data);
      });
    });
  }

  postAjax(url, data, errorRaise){
    console.log("Sending ...", data);
    let vm = this;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
      console.log("Current status:", xhr.readyState, xhr.status);
      if (xhr.readyState>3 && xhr.status==200) {
        vm.userInform(xhr.responseText, errorRaise);
      }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
    return xhr;
  }



  login(){
    var username = this.loginUsername.value;
    var password = this.loginPassword.value;
    console.log(username, password, this.validateEmail(username));
    if( !this.validateEmail(username) ){
      this.presentAlert('Email invalid', '');
    } else {
      console.log("Sending username, password to server ...");
      var data = "username="+username+"&password="+password;
      //var data = { username : username, password : password };
      this.postAjax('http://localhost:8000/api/users/login', data, "Wrong email or password");
    }
    //Sent username and password to server to login
  }

  regis(){
    var username = this.regisUsername.value;
    var password = this.regisPassword.value;
    if(password!= this.regisRePassword.value){
      this.presentAlert('Password is different', '')
      return 0;
    }
    console.log(username, password);
    if( !this.validateEmail(username) ){
      this.presentAlert('Email invalid', '');
    } else {
      console.log("Sending username, password to server ...");
      var data = "username="+username+"&password="+password;
      //var data = JSON.stringify{ username : username, password : password };      
      this.postAjax('http://localhost:8000/api/users/register', data, "Email existed");
    }
  }

}
    /*
    console.log("Sending ...", data);
    let vm = this;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
      console.log("Current status:", xhr.readyState, xhr.status);
      if (xhr.readyState>3 && xhr.status==200) {
        vm.userInform(xhr.responseText);
      }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
    return xhr;



  return new Promise((resolve, reject) => {
  this.http.post('url', data, options)
  .toPromise()
  .then((response) =>
  {
    console.log('API Response : ', response.json());
    resolve(response.json());
  })
  .catch((error) =>
  {
    console.error('API Error : ', error.status);
    console.error('API Error : ', JSON.stringify(error));
    reject(error.json());
  });
});
    */