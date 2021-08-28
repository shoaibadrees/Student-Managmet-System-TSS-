import { IspStudentParentInfos } from './../../shared/models/IspStudentParentInfos';
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
import { spStudentParentInfosService } from './spStudentParentInfos.service';



@Component({
  selector: 'app-department-dialog',
  templateUrl: './spStudentParentInfos.component.html',
  styleUrls: ['./spStudentParentInfos.component.scss'],
  providers: [spStudentParentInfosService], 
})


export class spStudentParentInfosComponent implements OnInit {
 
  obj: IspStudentParentInfos[] = [];
   private _route: ActivatedRoute;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: number;
  studentID: number = 0;
  dataSource: MatTableDataSource<IspStudentParentInfos>=new MatTableDataSource();
  isGridDataLoading : boolean;
  classObj: IspStudentParentInfos=null;

  displayedColumns: string[] = ['ParentInfoTitle','Mother' ,'FatherGuardian'];
  formSecurity:IFormSecurity;
   

  constructor(
    private _httpClient: HttpClient,
    public dialogRef: MatDialogRef<spStudentParentInfosComponent>,
    
     private _router: Router,
     @Inject(MAT_DIALOG_DATA) public data: any, 
    private notification : NotificationService,
    private _spStudentParentInfoService: spStudentParentInfosService)
     { 

      this.classObj = this.initObj();
      if(this.data == null){
      console.log('error');
      }
      if (this.data != null) {
       console.log(this.data);
        this.classObj.StudentID =this.data.studentID;
      


      
          
      }
      

    }

ngOnInit(): void {
    
    this._spStudentParentInfoService.getFormSeucirty('spStudentParentInfos')
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
    this._spStudentParentInfoService.getStudentParentInfoOnId(this.studentID)
            .subscribe(data1 => {
              this.selectedRowId=null;
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
initObj() :IspStudentParentInfos{
  var obj={} as IspStudentParentInfos;
 // obj.StudentID = 0;
  return obj;
}

getStudentParentInfos(){
  
this.studentID= this.classObj.StudentID;
if  (this.studentID){ 
   this._spStudentParentInfoService.getStudentParentInfoOnId(this.studentID).subscribe(data1=>{
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
  debugger;
 this._spStudentParentInfoService.insertOrUpdateRecord(this.obj,this.studentID).subscribe(data=>
  {
      { 
            //this.data.isOK = true;
            this.dialogRef.close(true);
          } 
        },
        err => {
        
          console.log(err);

          
        }
        );
  
    }
}

 
