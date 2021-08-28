
import { throwError as observableThrowError } from 'rxjs';
//// import { Http, Response } from '@angular/http';
//import { catchError, map, tap } from 'rxjs/operators';



import { Injectable } from '@angular/core';

import {IFormSecurity} from '../shared/models/IFormSecurity'
import {  BehaviorSubject} from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { resolve } from 'q';
import { AppService } from '../shared/services/app.service';
import { IPayDesignation } from '../shared/models/IPayDesignation';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';



//import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IPayDepartment } from 'app/shared/models/IPayDepartment';
// import { IpcNetConnectOpts } from 'net';


@Injectable()
export class DepartmentService {
    
  apiUrl = 'http://localhost:4917/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

  }

  getDepartments(): Observable<IPayDepartment[]> {
    let url: string = this.apiUrl + 'PayDepartment/getAll' ;
    return this._httpClient.get<IPayDepartment[]>(url).catch(this.handleError);
  }

  getFormSeucirty(frmName:string): Observable<IFormSecurity> {
    debugger;
    let url: string = this.apiUrl + 'PayDepartment/GetFormSecurity?formName='+frmName ;
    return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }

  updateRecord(PayDepartment: IPayDepartment): Observable<boolean> {
    let url = this.apiUrl + 'PayDepartment/postDepartment';  
    return this._httpClient.post<boolean>(url, PayDepartment).catch(this.handleError);
  }
  
  deleteRecord(payDeparmtent: IPayDepartment):Observable<boolean>{
    let url = this.apiUrl + 'PayDepartment/Delete';
    return this._httpClient.post<boolean>(url,payDeparmtent).catch(this.handleError);
  }


  // postFile(caption: string, fileToUpload: File) {
  //   const endpoint = 'http://localhost:4917/api/UploadImage';
  //   const formData: FormData = new FormData();
  //   formData.append('Image', fileToUpload, fileToUpload.name);
  //   formData.append('ImageCaption', caption);
  //   return this._httpClient.post(endpoint, formData);
  // }
  

}
