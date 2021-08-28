
import { throwError as observableThrowError } from 'rxjs';

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
import { IEmployee } from 'app/shared/models/IEmployee';
// import { IpcNetConnectOpts } from 'net';


@Injectable()
export class EmployeeService {
    
  apiUrl = 'http://localhost:4917/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

  }

  getEmployees(): Observable<IEmployee[]> {
    
    let url: string = this.apiUrl + 'Employee/getAll' ;
    return this._httpClient.get<IEmployee[]>(url).catch(this.handleError);
  }

  getNewEmployees(): Observable<IEmployee> {
    
    let url: string = this.apiUrl + 'Employee/GetNew' ;
    return this._httpClient.get<IEmployee>(url).catch(this.handleError);
  }

  getFormSeucirty(frmName:string): Observable<IFormSecurity> {
    
    let url: string = this.apiUrl + 'Employee/GetFormSecurity?formName='+frmName ;
    return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }

  updateRecord(Employee: IEmployee): Observable<boolean> {
    let url = this.apiUrl + 'Employee/postEmployee';
    return this._httpClient.post<boolean>(url, Employee).catch(this.handleError);
  }
  
  deleteRecord(Employee: IEmployee):Observable<boolean>{
    let url = this.apiUrl + 'Employee/Delete';
    return this._httpClient.post<boolean>(url,Employee).catch(this.handleError);
  }


  //image upload

  

  postFile(code:string,fileToUpload: File) {
    const endpoint = 'http://localhost:4917/api/UploadImage';
    const formData: FormData = new FormData();
    debugger;
    //formData.append('code', code);
    formData.set('code',code);
    formData.append('Image', fileToUpload, fileToUpload.name);
    
    return this._httpClient.post(endpoint, formData);
  }

  getEmpPhoto(itemId: string): Observable<any> {
    let apiUrl1 = 'http://localhost:4917/api/';
     const url: string = apiUrl1 + 'Employee/downloadPhoto?itemId=' + itemId;
     return this._httpClient.get(url, { responseType: 'blob' })
     .catch(this.handleError);
     
   }
  

}
