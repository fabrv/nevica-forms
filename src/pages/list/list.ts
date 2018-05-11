import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let x = 0; x < 5; x++) {
      this.items.push(x);
    }
  }
}
