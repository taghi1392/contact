import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { contactModel } from 'src/app/index/contactModel';
import { Observable, pipe } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  model = new contactModel();
  PHP_API_SERVER = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'authkey',
      /* 'userid': '1' */
    })
  };

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private HttpClient: HttpClient, private alert: AlertService) { }

  readContact(): Observable<contactModel> {
    return this.HttpClient.get<contactModel>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createContact(contact: contactModel): Observable<contactModel> {
    return this.HttpClient.post<contactModel>(`${this.PHP_API_SERVER}/api/create.php`, contact);
  }

  updateContact(contact: contactModel): Observable<contactModel> {
    return this.HttpClient.put<contactModel>(`${this.PHP_API_SERVER}/api/update.php`, contact);
  }

  deleteContact(id: number) {

    this.HttpClient.delete<contactModel>(`${this.PHP_API_SERVER}/api/delete.php?id=${id}`, this.httpOptions).subscribe(res => {

    }, (error) => {
      if (error) {
        this.handleError(error);
      }
    });
  }

  public handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // tslint:disable-next-line: deprecation
    return Observable.throw(errMsg);
  }
}
