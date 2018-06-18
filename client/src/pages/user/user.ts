import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  @ViewChild('userName') userName;
  @ViewChild('userPass') userPass;
  @ViewChild('password') password;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public globalVal: GlobalProvider,
    public http: HttpClient,
    public stoSave: Storage,
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage', this.globalVal.email, this.globalVal.userID, this.globalVal.userName);
  }

  userInform(data){
    console.log(data);
    var dataJson = data;
    if(dataJson['result']>0) {
      this.globalVal.userID = dataJson['id'];
      this.globalVal.userName = dataJson['name'];
      this.globalVal.email = dataJson['email'];
      this.stoSave.set('token', dataJson['token']);
      this.globalVal.presentAlert("Name and password changed", '')
    }
    else this.globalVal.presentAlert("Wrong Password", '');
  }

  async postAjax(url, data) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = { headers: headers };
    let response = await this.http.post(url, data, options).toPromise();
    this.userInform(response);
  }

  whatever(){
    console.log(this.userName.value, this.userPass.value, this.password.value);
    var userPass = this.userPass.value;
    if(this.userPass.value==''){
      userPass = this.password.value;
    }
    var data = "id="+this.globalVal.userID
      +"&password="+this.password.value
      +"&username="+this.globalVal.email
      +"&userName="+this.userName.value
      +"&userPass="+userPass;
    console.log(data);
    //api/users/changepass
    this.postAjax('http://localhost:8000/api/users/changepass', data);
  }
}
