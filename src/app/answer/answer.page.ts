import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  formId: string = '';
  forms: any = [];
  form: any = [];
  private sub: any;

  constructor(private route: ActivatedRoute) { }

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
  }

}
