import { IStudentHealthInfos } from './../../shared/models/IStudentHealthInfo';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { HealthInfoDialogService } from './HealthInfo_Dialog.service';



@Component({
  selector: 'app-HealthInfo',
  templateUrl: './HealthInfo_Dialog.component.html',
  styleUrls: ['./HealthInfo_Dialog.component.scss'],
  providers: [HealthInfoDialogService], 
})

export class HealthInfoDialogComponent implements OnInit {

  obj: IStudentHealthInfos[] = [];
   private _route: ActivatedRoute;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: number;
  studentID: number = 0;
 // dataSource: MatTableDataSource<IStudentHealthInfos>=new MatTableDataSource();
 dataSource: MatTableDataSource<IStudentHealthInfos>= new MatTableDataSource();
  isGridDataLoading : boolean;
  classObj: IStudentHealthInfos=null;

  displayedColumns: string[] = ['StudentDiseasesTitle','isPresent' ,'Comments'];
  formSecurity:IFormSecurity;
   

  constructor(
    private _httpClient: HttpClient,
    public dialogRef: MatDialogRef<HealthInfoDialogComponent>,
    
     private _router: Router,
     @Inject(MAT_DIALOG_DATA) public data: any, 
    private notification : NotificationService,
    private _StudentHealthInfoService: HealthInfoDialogService)
     { 

      this.classObj = this.initObj();
      if(this.data == null){
      console.log('error');
      }
      if (this.data != null) {
       console.log(this.data);
        this.classObj.StudentID =this.data.studentID;
      


       // this._StudentHealthInfoService = this.data.service;
          
      }
      

    }

ngOnInit(): void {
    this._StudentHealthInfoService.getFormSeucirty('spStudentHealthInfos')
        .subscribe(data => {
          this.formSecurity = data;
          if(this.formSecurity.CanView === true)
          {
             this.getStudentParentInfos();
         }
          else 
          {
            // redirect to other page
            this._router.navigate(['PayDesignation/no'])
          } 
        },
          err => {
            console.log(err);
          }
        );

}
refreshGrid(): void{
    this.isGridDataLoading = true;
    this._StudentHealthInfoService.getStudentHealthInfoOnId(this.studentID)
            .subscribe(data1 => {
              this.selectedRowId=null;
              debugger;
              this.dataSource = new MatTableDataSource(data1);
              this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
               // this.isGridDataLoading = false;
            },
              err => {
                this.isGridDataLoading = false;
                console.log(err);
              }
            );

}
initObj() :IStudentHealthInfos{
  var obj={} as IStudentHealthInfos;
 // obj.StudentID = 0;
  return obj;
}
getStudentParentInfos(){ 
this.studentID= this.classObj.StudentID;
if  (this.studentID){ 
   this._StudentHealthInfoService.getStudentHealthInfoOnId(this.studentID).subscribe(data1=>{
    this.selectedRowId=null;
    this.dataSource = new MatTableDataSource(data1);
    this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    this.isGridDataLoading = false;
  },
    err => {
      this.isGridDataLoading = false;
      console.log(err);
    }
  );

}
 
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
saveRecords(){
  this.obj= this.dataSource.data;
 this._StudentHealthInfoService.insertOrUpdateRecord(this.obj,this.studentID).subscribe(data=>
  {
    if(data)
    {
     this.dialogRef.close(true);
    }
    else
    {
      this.notification.warning('Problem while Saving The Record');
    }
    
  },
  err=>
  {
    this.notification.warning(err);
  }

 )
  
  
  

}

}
