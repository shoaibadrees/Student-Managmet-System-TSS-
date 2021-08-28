
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
// import { IpcNetConnectOpts } from 'net';


@Injectable()
export class DesignationService {
  apiUrl = 'http://localhost:4917/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

  }

  getDesignations(): Observable<IPayDesignation[]> {
    let url: string = this.apiUrl + 'PayDesignation/getAll' ;
    return this._httpClient.get<IPayDesignation[]>(url).catch(this.handleError);
  }

  getFormSeucirty(frmName:string): Observable<IFormSecurity> {
    debugger;
    let url: string = this.apiUrl + 'PayDesignation/GetFormSecurity?formName='+frmName ;
    return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }

  updateRecord(payDesignation: IPayDesignation): Observable<boolean> {
    let url = this.apiUrl + 'PayDesignation/postDesignation';
    return this._httpClient.post<boolean>(url, payDesignation).catch(this.handleError);
  }
  
  deleteRecord(payDesignation: IPayDesignation):Observable<boolean>{
    let url = this.apiUrl + 'PayDesignation/Delete';
    return this._httpClient.post<boolean>(url,payDesignation).catch(this.handleError);
  }

  

  //updateEmpHRInfo(empHRInfo: IEmpHRInfo): Observable<any> {
  //  let url = this._global.serviceUrl + 'api/hr/putEmpHRInfo';
  //  return this._httpClient.put<any>(url, empHRInfo).catch(this.handleError);
  //}

  //DeleteEmployeeDocument(documentID: string, fileName: string): Observable<boolean> {
  //  let url = this._global.serviceUrl + 'api/hr/deleteEmployeeDocument?documentID=' + documentID + "&fileName=" + fileName;
  //  return this._httpClient.delete<boolean>(url).catch(this.handleError);
  //}
  //public loading: boolean = false;

  //private _users: BehaviorSubject<PayUser[]>;
  
  //private dataStore: {
  //  users: PayUser[]
  //}

  //constructor(private http: HttpClient
  //) {
  //  this.dataStore = { users: [] };
  //  this._users = new BehaviorSubject<PayUser[]>([]);
  //}

  //get users(): Observable<PayUser[]> {
  //  return this._users.asObservable();
  //}

  //addUser(user: PayUser): Promise<PayUser> {
  //  return new Promise((resolver, reject) => {
  //    user.id = this.dataStore.users.length + 1;
  //    this.dataStore.users.push(user);
  //    this._users.next(Object.assign({}, this.dataStore).users);
  //    resolver(user);
  //  });
  //}

  //userById(id: number) {
  //  return this.dataStore.users.find(x => x.id == id);
  //}

  //loadAll() {
  //  const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

  //  return this.http.get<PayUser[]>(usersUrl)
  //    .subscribe(data => {
  //      this.dataStore.users = data;
  //      this._users.next(Object.assign({}, this.dataStore).users);
  //    }, error => {
  //      console.log("Failed to fetch users");
  //    });
  //}

}
