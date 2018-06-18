import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public globalVal: GlobalProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalPage');
    this.update()
  }
  
  update(){
    this.globalVal.blogsTaker(this.globalVal.guestID);
  }
}
