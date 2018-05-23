import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

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
  @ViewChild(Slides) slides: Slides;
  formId: string = "";
  forms: any = [];
  form: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {    
    this.forms = JSON.parse(localStorage.availableForms);
    this.formId = navParams.get('formId');    

    for (let x = 0; x < this.forms.length; x++){
      if (this.forms[x].FORM_NAME == this.formId){        
        this.form = this.forms[x];
      }
    }
  }

  ngOnInit(){
    this.slides.lockSwipes(true);
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext(200);
    this.slides.lockSwipes(true);

    console.log(this.forms);
    localStorage.availableForms = JSON.stringify(this.forms);
  }
  prevSlide(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev(200);
    this.slides.lockSwipes(true);    

    console.log(this.forms);    
    localStorage.availableForms = JSON.stringify(this.forms);
  }

  finishForm(){
    console.log("TEST")
    if (localStorage.finishedForms) {
      let finishedForms:any = [];
      finishedForms = JSON.parse(localStorage.finishedForms);
      finishedForms.push(this.form);

      let i = this.forms.indexOf(this.form);
      this.forms.splice(i, 1)
      localStorage.availableForms = JSON.stringify(this.forms);
      this.slides.slideTo(1,200)

      localStorage.finishedForms = JSON.stringify(finishedForms);
    }else{
      localStorage.finishedForms = JSON.stringify([this.form]);
    }
  }
}
