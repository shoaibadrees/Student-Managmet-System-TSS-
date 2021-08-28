import { IKinshipInfos } from './../shared/models/IKinshipInfo';
import { AcademicHistoryComponent } from './AcademicHistory/AcademicHistory.component';

import { NotificationService } from './../Services/notification.service';
import { MessageDialogComponent } from './../shared/message-dialog/message-dialog.component';
import { IFormSecurity } from './../shared/models/IFormSecurity';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './student.service';
import { IStudents } from './../shared/models/IStudents';
import { HealthInfoDialogComponent } from './HealthInfo/HealthInfo_Dialog.component';
import { FeeHistoryDialogComponent } from './FeeHistory/FeeHistory_Dialog.component';
import { AdmissionHistoryDialogComponent } from './AdmissionHistory/AddmissionHistory_Dialog.component';
import { spStudentParentInfosComponent } from './spStudentParentInfos/spStudentParentInfos.component';
import { KinshipComponent } from './Kinship/Kinship.component';
import { AcademicHistoryDialogComponent } from './AcademicHistory/AcademicHistory_Dialog/AcademicHistory-dialog.component';
@Component({
  selector: 'app-studentsList',
  templateUrl: './StudentsList.component.html',
  styleUrls: ['./StudentsList.component.scss'],
  providers: [StudentService],
})
export class StudentsListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowId: number;
  dataSource: MatTableDataSource<IStudents>=new MatTableDataSource();
  isGridDataLoading : boolean;

  displayedColumns: string[] = ['StudentID' ,'Code','FirstName', 'FatherName','ClassID','Action'];
  formSecurity:IFormSecurity;
  constructor(
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService, private _StudentService: StudentService) { }

ngOnInit(): void {
    this._StudentService.getFormSeucirty('spStudents')
        .subscribe(data => {
          this.formSecurity = data;
          if(this.formSecurity.CanView === true)
          {
            this.refreshGrid();
          }
          else 
          {
            // redirect to other page
            this._router.navigate(['dashboard/no'])
          }
        },
          err => {
            console.log(err);
          }
        );

}
refreshGrid(): void{
    this.isGridDataLoading = true;
    this._StudentService.getStudents()
            .subscribe(data1 => {
               this.dataSource = new MatTableDataSource(data1);
                this.selectedRowId=null;
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
insertRecord(): void{
  
  this._router.navigate(["/Students"]);
}

editRecord(obj: IStudents): void {

 this.selectedRowId = obj.StudentID;
 
  if(this.formSecurity.CanEdit===true){
    
    //this._router.navigate(['/Students',this.selectedRowId]);
    this._router.navigate(["/UpdateStudents",this.selectedRowId]);
 }
  else{
    let msg  = 'You dont have permission to update : ';

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      panelClass: 'custom1-dialog-container',
      width: '465px',
      disableClose: true,

      data: {
        message: msg, messageType: 'W',title: 'Update'
        ,OkTitle: 'OK'
        ,cancelTitle: 'No',
        IsCancelBtnVisible: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const isOk: boolean = (result === undefined) ? false : result;
      if (isOk) {
       dialogRef.close();
    }
     });
    
  }
  
}

spParentsInfos(obj: IStudents): void
{
    const dialog= this.dialog.open(spStudentParentInfosComponent,{
      panelClass: 'custom1-dialog-container',
width:  '800px',
height:  '700px',
data : {studentID: obj.StudentID
  , service: this._StudentService}
    })
    dialog.afterClosed().subscribe(result => {
      let isOk: boolean = (result == undefined) ? false : result;
      if (isOk) {
        this.notification.success(' Student Parent Information Succcessfully Updated!');
        console.log('Updated')
        this.refreshGrid();
    }    
    },
    err=>
    {
      this.notification.warning(err);
      this.isGridDataLoading=false;
    
  }
    );
}
KinShipInfo(obj: IStudents):void{
  const diaref= this.dialog.open(KinshipComponent,{
    panelClass: 'custom1-dialog-container',
    width: "750px", 
    height: "550px",
    data: {studentID: obj.StudentID,
    service: this._StudentService
  }

 });
  
  diaref.afterClosed().subscribe(result => {
    let isOk: boolean = (result == undefined) ? false : result;
    if (isOk) {
      console.log(isOk);
      this.notification.success('Succcessfully Updated!');
      this.refreshGrid();
  } 
  },
  err=>
  {
    this.notification.warning('Error While Updating Student Kinship Information');
  }
  );
  
}
  HealthInfo(obj: IStudents): void
  {
    const diaref= this.dialog.open(HealthInfoDialogComponent,{
      panelClass: 'custom1-dialog-container',
      width:'800px',
      height: '600px',
     data : {studentID: obj.StudentID
        , service: this._StudentService}
 });
 diaref.afterClosed().subscribe(result => {
   if(result){
  let isOk: boolean = (result == undefined) ? false : result;
  if (isOk) {
    console.log(isOk);
    this.notification.success('Succcessfully Student Health Information Updated!');
    this.refreshGrid();
  }
  }
},
err=>
{
  this.notification.warning(err);
});
}

  AcademicHistory(obj: IStudents):void
  {
 
    const dialog= this.dialog.open(AcademicHistoryComponent,{
      panelClass: 'custom1-dialog-container',
      width: "900px",
      height: "600px",
      data: {studentID: obj.StudentID,
        service: this._StudentService
      }
    });
    
  }
  FeeHistory():void{
    {
      const dialog= this.dialog.open(FeeHistoryDialogComponent,{
        panelClass: 'custom1-dialog-container',
        width: '550px',
        height: '400px'
      })
    }
  }
  AdmissionHistory():void{
     const dialog= this.dialog.open(AdmissionHistoryDialogComponent,
      {
        panelClass: 'custom1-dialog-container',
        width:'550px',
        height: '400px'

      }) 
  }
deleteRecord(obj: IStudents){

 this.selectedRowId = obj.StudentID;
  if(this.formSecurity.CanDelete===true){
      let msg  = 'Are you sure you want to delete designation : '+obj.Code;

      const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '465px',
      panelClass: 'custom1-dialog-container',

      data: {
      message: msg, messageType: null ,title: 'Delete'
      ,OkTitle: 'Yes'
      ,cancelTitle: 'No',
      IsCancelBtnVisible: true
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    const isOk: boolean = (result === undefined) ? false : result;
    if (isOk) {
          this._StudentService.deleteRecord(obj).subscribe(data=> {
          this.notification.success('Succcessfully Deleted!');
          this.refreshGrid();
},
          err=>{
          console.log(err);
          }
          );
      }
  });
}
  else{
    let msg  = 'You dont have permission to delete : ';

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '465px',
      disableClose: true,
      panelClass: 'custom1-dialog-container',
      
      backdropClass: 'backdropBackground', // This is the "wanted" line
      data: {
        message: msg, messageType: null ,title: 'Permission Error'
        ,OkTitle: 'OK'
        ,cancelTitle: 'No',
        IsCancelBtnVisible: false
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      const isOk: boolean = (result === undefined) ? false : result;
      if (isOk) {
      dialogRef.close();
    }
    });
    
  }


  
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;

// for(let column of this.displayedColumns){
// this.dataSource.filter = column;
// this.dataSource.filter = filterValue.trim().toLowerCase();
// }
this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}





}
