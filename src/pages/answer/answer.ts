import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  formId: string = "";
  questions: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let forms: any = JSON.parse(localStorage.availableForms);
    this.formId = navParams.get('formId');

    for (let x = 0; x < forms.length; x++){
      if (forms[x].FORM_NAME == this.formId){
        this.questions = forms[x].QUESTIONS;
      }
    }
  }
}
