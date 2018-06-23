import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the StorageSaveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageSaveProvider {

  constructor(public events: Events) {
    console.log('Hello StorageSaveProvider Provider');
  }

  updateFinishedForms(){
    this.events.publish('finishedFormsChanged')
  }
}
