
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stoSave: Storage,
    public http: HttpClient,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    var data = { token : '502f13a6a4bd7bdd30b2d78dd0a05677c098233e' };
    var DATA = "token=502f13a6a4bd7bdd30b2d78dd0a05677c098233e";
    //this.postAjax('http://localhost:8000/api/chats/test', DATA, '\n\n\nFirst Testing');
    this.___postAjax('http://localhost:8000/api/chats/test', DATA);

  }

  async ___postAjax(url, data) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = { headers: headers };
    let response = await this.http.post(url, data, options).toPromise();
    console.log('API Response : ', response);
  }

}
