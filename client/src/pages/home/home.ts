import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { GlobalProvider } from "../../providers/global/global";
import { ShowPage } from "../show/show";
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public globalVal: GlobalProvider,
    ) {
  }

  @ViewChild('title') title;
  @ViewChild('body') body;

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalPage');
    this.update()
  }
  
  update(){
    this.globalVal.blogsTaker(this.globalVal.userID);
  }

  blog(){
    if(this.title.value.length == 0){
      this.globalVal.presentAlert('Title cannot be emply', '');
    } else if(this.body.value.length == 0){
      this.globalVal.presentAlert('Body cannot be emply', '');
    } else {
      this.globalVal.blogPoster(this.title.value, this.body.value);
      this.update();
    }
  }

  blogUserInfo(guestId, guestName){
    console.log(guestId, guestName);
    if(guestId == this.globalVal.userID){
      this.navCtrl.setRoot( HomePage );
    } else {
      this.globalVal.guestID = guestId;
      this.globalVal.guestName = guestName;
      this.navCtrl.push( ShowPage );
    }
  }

}
