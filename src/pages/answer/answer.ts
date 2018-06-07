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
    //This will disable the swiping between the slides (questions)
    this.slides.lockSwipes(true);
  }

  nextSlide(){
    //The sliding must be reenabled to move to the next slide    
    this.slides.lockSwipes(false);
    //The parameter is the time for the animation in milliseconds
    this.slides.slideNext(200);
    //After the animation is donde then disable the swiping again
    this.slides.lockSwipes(true);    
    localStorage.availableForms = JSON.stringify(this.forms);
  }
  prevSlide(){
    //Same comments as in next slide but for prevslides
    this.slides.lockSwipes(false);
    this.slides.slidePrev(200);
    this.slides.lockSwipes(true);    
    
    localStorage.availableForms = JSON.stringify(this.forms);
  }

  finishForm(){
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1)  + "-"
                    + currentdate.getDate() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes()

    this.form.FINISHED_DATE = datetime;
    if (localStorage.finishedForms) {
      let finishedForms:any = [];
      finishedForms = JSON.parse(localStorage.finishedForms);
      finishedForms.push(this.form);

      localStorage.finishedForms = JSON.stringify(finishedForms);
      this.slides.lockSwipes(false);
      this.slides.slideTo(0,200);
      this.slides.lockSwipes(true);

      for (let i = 0; i < this.form.QUESTIONS.length; i ++){        
        this.form.QUESTIONS[i].ANSWER = ""
      }
      localStorage.availableForms = JSON.stringify(this.forms);
    }else{
      localStorage.finishedForms = JSON.stringify([this.form]);
    }
  }
}
