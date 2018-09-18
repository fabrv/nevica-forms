import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Slides, ToastController } from '@ionic/angular'

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  @ViewChild('slides') slides;
  formId: string = '';
  forms: any = [];
  form: any = [];

  slideOpts: any = {allowTouchMove: false};
  private sub: any;

  constructor(private route: ActivatedRoute, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.forms = JSON.parse(localStorage.availableForms);
    this.sub = this.route.params.subscribe(params => {
        this.formId = params['formId']; // (+) converts string 'id' to a number
    });
    this.sub.unsubscribe();

    for (let x = 0; x < this.forms.length; x++){
      if (this.forms[x].FORM_NAME == this.formId){
        this.form = this.forms[x];
      }
    }
    console.log(this.form.LAST_SLIDE);
    this.slideOpts = {allowTouchMove: false, initialSlide: this.form.LAST_SLIDE}
  }

  nextSlide(){
    this.slides.nativeElement.slideNext(200);    

    this.saveIndex();
  }


  prevSlide(){        
    this.slides.nativeElement.slidePrev(200);    

    this.saveIndex();
  }

  saveIndex(){
    //Change lastSlide ID
    //300 ms of timeoute to account for the slides movement.
    setTimeout(()=>{
      this.form.LAST_SLIDE = this.slides.nativeElement.getActiveIndex();
      localStorage.availableForms = JSON.stringify(this.forms);
    },300);
  }


  finishForm(){
    //Get current date and format it in YYYY-MM-DD HH:mm:SS
    let currentdate = new Date(); 
    let datetime:string = currentdate.getFullYear() + '-'
                    + (currentdate.getMonth()+1)  + '-'
                    + currentdate.getDate() + ' '
                    + currentdate.getHours() + ':'
                    + currentdate.getMinutes() + ':'
                    + currentdate.getSeconds()

    this.form.FINISHED_DATE = datetime;


    this.form.LAST_SLIDE = 0;
    this.slides.nativeElement.slideTo(0,200);

    this.form.FILLED_NO += 1;

    if (localStorage.finishedForms) {      
      let finishedForms:any = [];
      finishedForms = JSON.parse(localStorage.finishedForms);
      finishedForms.push(this.form);
      
      localStorage.finishedForms = JSON.stringify(finishedForms);
    }else{
      localStorage.finishedForms = JSON.stringify([this.form]);
    }
    
    for (let i = 0; i < this.form.QUESTIONS.length; i ++){        
      this.form.QUESTIONS[i].ANSWER = ''
    }
    localStorage.availableForms = JSON.stringify(this.forms);
    //this.storageSave.updateFinishedForms();

    this.presentToast('Formulario finalizado y guardado.')
  }

  //Default ionic toast
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
