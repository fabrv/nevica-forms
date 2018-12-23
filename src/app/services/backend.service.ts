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
   * @param {string} code - The form code to query the questions
   */
  public getForm(code: string): Promise<any>{
    return new Promise ((questions)=>{
      this.http.get(`${environment.backendAddress}/forms/${code}`)
      .subscribe(
        data => questions(data),
        error => questions({status: false, error: error})
      );
    })
  }

  public postForms(forms: Array<any>): Promise<any>{
    return new Promise((response)=>{
      //console.log(encodeURI(JSON.stringify(forms)))
      //console.log(encodeURI(JSON.stringify(forms)))
      console.log(forms)
      this.http.post(`${environment.backendAddress}/forms`,forms).subscribe(
        data => response({status: true, data: data}),
        error => response({status: false, error: error})
      )
    })
  }
}
