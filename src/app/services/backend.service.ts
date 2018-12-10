import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as environment from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  data: Observable<any>
  constructor(public http: HttpClient) { }

  /**
   * Returns a promise with questions as callback
   * @param {number} formCode - The code to query the questions
   */
  getForm(formCode: number){
    return new Promise ((questions)=>{
      this.http.post(`${environment.backendAddress}/forms/${formCode}`,{}, {})
      .subscribe(data =>{
        questions(data);
      });
    })
  }
}
