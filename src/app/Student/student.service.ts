import { VaccinationsDialogComponent } from './../Vaccinations/Vaccinations_Dialog/Vaccinations-dialog.component';
import { IStudents } from './../shared/models/IStudents';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppService } from 'app/shared/services/app.service';
import { throwError as observableThrowError } from 'rxjs';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = 'http://localhost:4917/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    
   }

   getStudents(): Observable<IStudents[]> {
    let url: string = this.apiUrl + 'spStudent/getAll' ;
    return this._httpClient.get<IStudents[]>(url).catch(this.handleError);
  }
  getStudentsOnId(studentID:number):Observable<IStudents>{
    
    let url: string = this.apiUrl + 'spStudent/getStuentInfoOnID?studentID='+studentID;
    
    return this._httpClient.get<IStudents>(url).catch(this.handleError);
  }
   downloadStudentPhoto(studentID: number): Observable<any> {
    
    const url: string = this.apiUrl + 'spStudent/downloadEmpPhoto?studentID=' + studentID;

    return this._httpClient.get(url, { responseType: 'blob' })
    .catch(this.handleError);
  }
   uploadStudentPhoto(obj: FormData): Observable<any> {
     debugger;
    let url: string = this.apiUrl + 'spStudent/uploadEmployeePhoto' ;

    return this._httpClient.post<any>(url, obj).catch(this.handleError);
      
  }
  deleteEmpPhoto(studentID: number): Observable<boolean> {
    const url: string = this.apiUrl + 'spStudent/deleteEmpPhoto?studentID=' + studentID;

    return this._httpClient.delete<boolean>(url)
    .catch(this.handleError);
  }
  getFormSeucirty(frmName:string): Observable<IFormSecurity> {
  
    let url: string = this.apiUrl + 'spStudent/GetFormSecurity?formName='+frmName ;
    return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
  insertOrUpdateRecord(spStudents: IStudents): Observable<number> {
  
    let url = this.apiUrl + 'spStudent/postStudent';
    return this._httpClient.post<number>(url, spStudents).catch(this.handleError);
  }
  deleteRecord(spStudents: IStudents):Observable<boolean>{
  
    let url = this.apiUrl + 'spStudent/Delete';
    return this._httpClient.post<boolean>(url,spStudents).catch(this.handleError);
  }
}
