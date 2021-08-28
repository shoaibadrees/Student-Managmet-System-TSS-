import { IStudents } from './../../shared/models/IStudents';
import { IspStudentAcademicDetails } from './../../shared/models/IspStudentAcademicDetail';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { IPayDepartment } from './../../shared/models/IPayDepartment';
import { NotificationService } from './../../Services/notification.service';
import { IFormSecurity } from './../../shared/models/IFormSecurity';
import { AcademicHistoryService } from './AcademicHistory.service';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicHistoryDialogComponent } from './AcademicHistory_Dialog/AcademicHistory-dialog.component';



@Component({
  selector: 'app-departments',
  templateUrl: './AcademicHistory.component.html',
  styleUrls: ['./AcademicHistory.component.scss'],
  providers: [AcademicHistoryService], 
})
export class AcademicHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: number;
  studentID: number;
  isAddMode=true;
  dataSource: MatTableDataSource<IspStudentAcademicDetails>=new MatTableDataSource();
  isGridDataLoading : boolean;
  classObj: IspStudentAcademicDetails=null;
  displayedColumns: string[] = ['PreviousSchoolID' ,'Institute', 'DateFrom','DateTo','Action'];
  formSecurity:IFormSecurity;
   
  
  constructor(
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private notification : NotificationService, private _AcademicHistoryService : AcademicHistoryService) {
      this.classObj = this.initObj();
      if(this.data == null){
      console.log('error');
      }
      if (this.data != null) {
       console.log(this.data);
        this.classObj.StudentID =this.data.studentID;
          
      }
       
     }
     initObj() :IspStudentAcademicDetails{
      var obj={} as IspStudentAcademicDetails;
     // obj.StudentID = 0;
      return obj;
    }
ngOnInit(): void {
 
  this._AcademicHistoryService.getFormSeucirty('spStudentAcademicInfos')
  .subscribe(data => {
    this.formSecurity = data;
    if(this.formSecurity.CanView === true)
    {

      this.getStudentKinshipInfos();

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
getStudentKinshipInfos(){ 
  this.studentID= this.classObj.StudentID;
  if  (this.studentID){ 
     this._AcademicHistoryService.getStudenttAcademicInfoOnID(this.studentID).subscribe(data1=>{
      this.selectedRowId=null;
      console.log(data1);
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
  


insertRecord(studentID: number,isAddMode: boolean): void{
    this._AcademicHistoryService.getFormSeucirty('spStudentAcademicInfos').subscribe(data=>{
      data  = this.formSecurity;
      if(this.formSecurity.CanEdit===true)
      {
   const dialogRef = this.dialog.open(AcademicHistoryDialogComponent, {
          panelClass: 'custom1-dialog-container',
          width: "750px",
          height: "650px",
          data :  {studentID: studentID,addMode: isAddMode
            , service: this._AcademicHistoryService}
          
        });
        debugger;
        dialogRef.afterClosed().subscribe(result => {
          let isOk: boolean = (result == undefined) ? false : result;
          if (isOk) {
            console.log(isOk);
            this.notification.success('Succcessfully Inserted!')
            this.getStudentKinshipInfos();
           console.log("The dialog was closed");}
          
          
        });
   }
      else{
        let msg  = 'You dont have permission to Insert : ';
    
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
       
      
    });
    
}
editRecord(obj: IspStudentAcademicDetails): void {
  this.selectedRowId = obj.PreviousSchoolID;
  if(this.formSecurity.CanEdit===true){
    const dialogRef = this.dialog.open(AcademicHistoryDialogComponent, 
      
      {
        panelClass: 'custom1-dialog-container',
      disableClose:false,
      height: "650px",
      width: "650px",
      data : {obj: obj
        , service: this._AcademicHistoryService}
    });
    debugger;

    dialogRef.afterClosed().subscribe(result => {
      let isOk: boolean = (result == undefined) ? false : result;
      if (isOk) {
        debugger;

        this.notification.success('Succcessfully Updated!');
        console.log('Updated')
        this.getStudentKinshipInfos();
        
      console.log("The dialog was closed");}
     
      
    });

  
   
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
deleteRecord(obj: IspStudentAcademicDetails){
  debugger;
  this.selectedRowId = obj.PreviousSchoolID
  if(this.formSecurity.CanDelete===true){
      let msg  = 'Are you sure you want to delete Student Academic Details : '+obj.PreviousSchoolID;

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
      debugger;
          this._AcademicHistoryService.deleteRecord(obj).subscribe(data=> {
        
          this.notification.success('Student Academic Infomation Succcessfully Deleted!');
          this.getStudentKinshipInfos();

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
