import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public events: Events) { }

  updateFinishedForms(){
    this.events.publish('formsChanged')
  }
}
