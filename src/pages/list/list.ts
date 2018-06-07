import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormPage } from '../form/form';
import { SocketProvider } from '../../providers/socket/socket'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [SocketProvider]
})
export class ListPage {
  forms:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private socket: SocketProvider, public events: Events) {
    this.forms = JSON.parse(localStorage.finishedForms);
  }

  pushPage(datetime){
    // Push another page onto the navigation stack.
    // Causing the nav controller to transition to the new page.   
    this.navCtrl.push(FormPage, {
      date: datetime
    });
  }

  upload(index: number){
    console.log(this.forms.length);
    console.log(index);
    
    //Define loader
    let loading = this.loadingCtrl.create({
      content: 'Subiendo formulario ' + (index + 1) + "/" + this.forms.length
    });
    //Start loader
    loading.present();
    
    console.log(this.forms[index])
    this.socket.transactionEmitter(this.forms[index],"insertFilledForm","formUploaded")

    //Subscibe to 'formUploaded' in SocketProvider
    this.events.subscribe("formUploaded", (data) => {        
      //Once the message is receive unsuscribe
      this.events.unsubscribe("formUploaded");
      console.log(data);
    })
  }
}