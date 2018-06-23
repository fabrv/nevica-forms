import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  datetime: string = '';
  questions: any = [];
  formName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let forms: any = JSON.parse(localStorage.finishedForms);
    this.datetime = navParams.get('date');

    for (let x = 0; x < forms.length; x++){
      if (forms[x].FINISHED_DATE == this.datetime){
        this.formName = forms[x].FORM_NAME
        this.questions = forms[x].QUESTIONS;
      }
    }
  }
}