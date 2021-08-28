import { ISections } from 'app/shared/models/ISections';
import { IFeeHistory } from './../../shared/models/IFeeHistory';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';


import { throwError as observableThrowError } from 'rxjs';
//// import { Http, Response } from '@angular/http';
//import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {  BehaviorSubject} from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { resolve } from 'q';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';



//import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IPayDepartment } from 'app/shared/models/IPayDepartment';

import { AppService } from 'app/shared/services/app.service';
// import { IpcNetConnectOpts } from 'net';


@Injectable()
export class FeeHistoryDialogService {
    
  apiUrl = 'http://localhost:4917/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

  }

  getFeePlan(): Observable<IFeeHistory[]> {
  debugger;
    let url: string = this.apiUrl + 'sfFeePlan/getAllFeePlan' ;
    return this._httpClient.get<IFeeHistory[]>(url).catch(this.handleError);
  }
  getFeeTemplate(): Observable<IFeeHistory[]> {
    debugger;
      let url: string = this.apiUrl + 'sfFeePlan/getAllFeeTemplate' ;
      return this._httpClient.get<IFeeHistory[]>(url).catch(this.handleError);
    }

  getFormSeucirty(frmName:string): Observable<IFormSecurity> {
   
    let url: string = this.apiUrl + 'spSections/GetFormSecurity?formName='+frmName ;
    return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }

  updateRecord(spSections: ISections): Observable<boolean> {
    
    let url = this.apiUrl + 'spSections/postDepartment';
    return this._httpClient.post<boolean>(url, spSections).catch(this.handleError);
  }
  
  deleteRecord(spSectons: ISections):Observable<boolean>{
    
    let url = this.apiUrl + 'spSectons/Delete';
    return this._httpClient.post<boolean>(url,spSectons).catch(this.handleError);
  }

  

 

}
