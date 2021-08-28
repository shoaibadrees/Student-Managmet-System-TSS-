import { IspStudentAcademicDetails } from './../../shared/models/IspStudentAcademicDetail';
import { AppService } from './../../shared/services/app.service';

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

// import { IpcNetConnectOpts } from 'net';


@Injectable()
export class AcademicHistoryService {
    
  apiUrl = 'http://localhost:4917/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

  }

  getStudenttAcademicInfoOnID(studentID:number):Observable<IspStudentAcademicDetails[]>{
    let url: string = this.apiUrl + 'spStudentAcademicInfos/getStudentAcademicInfoOnId?studentID='+studentID;
    return this._httpClient.get<IspStudentAcademicDetails[]>(url).catch(this.handleError);
  }

  insertOrUpdateRecord(spStudentAcademicDetail: IspStudentAcademicDetails,studentID: number): Observable<boolean> {
    let url = this.apiUrl + 'spStudentAcademicInfos/postStudentAcademicInfos?studentID='+studentID;
    return this._httpClient.post<boolean>(url, spStudentAcademicDetail).catch(this.handleError);
  }
  getFormSeucirty(frmName:string): Observable<IFormSecurity> {
    let url: string = this.apiUrl + 'spStudentAcademicInfos/GetFormSecurity?formName='+frmName ;
    return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }

  updateRecord(PayDepartment: IspStudentAcademicDetails): Observable<boolean> {
    let url = this.apiUrl + 'PayDepartment/postDepartment';
    return this._httpClient.post<boolean>(url, PayDepartment).catch(this.handleError);
  }
  
  deleteRecord(spStudentAcademic: IspStudentAcademicDetails):Observable<boolean>{
    debugger;
    let url = this.apiUrl + 'spStudentAcademicInfos/Delete';
    return this._httpClient.post<boolean>(url,spStudentAcademic).catch(this.handleError);
  }

  

  

}
