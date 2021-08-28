import { IKinshipInfos } from './../../shared/models/IKinshipInfo';

import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { KinshipService } from './Kinship.service';
import { KinshipDialogComponent } from './Kinship_Dialog/Kinship-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './Kinship.component.html',
  styleUrls: ['./kinship.component.scss'],
  providers: [KinshipService], 
})
export class KinshipComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: number;
  studentID: number=0;
  isAddMode=true;
  dataSource: MatTableDataSource<IKinshipInfos>=new MatTableDataSource();
  isGridDataLoading : boolean;

  displayedColumns: string[] = ['Name', 'Class','Relation','Action'];
  formSecurity:IFormSecurity;
  classObj: IKinshipInfos=null;
  
  constructor(
    private _httpClient: HttpClient, private dialog: MatDialog,
    public dialogRef: MatDialogRef<KinshipComponent>,
     private _router: Router,
     @Inject(MAT_DIALOG_DATA) public data: any, private notification : NotificationService, private _KinshipService : KinshipService) { 
       
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
    this._KinshipService.getFormSeucirty('PayDepartments')
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
initObj() :IKinshipInfos{
  var obj={} as IKinshipInfos;
 // obj.StudentID = 0;
  return obj;
}
getStudentKinshipInfos(){ 
  this.studentID= this.classObj.StudentID;
  if  (this.studentID){ 
     this._KinshipService.getStudnetKinshipInfoOnID(this.studentID).subscribe(data1=>{
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
  
insertRecord(studentID: number,isAddMode: boolean): void{
    this._KinshipService.getFormSeucirty('spStudentKinshipInfos').subscribe(data=>{
      data  = this.formSecurity;
      if(this.formSecurity.CanEdit===true)
      {
        debugger;
        
        const kinshipdialog = this.dialog.open(KinshipDialogComponent, {
          panelClass: 'custom1-dialog-container',
          height: "550px",
          width: "550px",
          data :  {studentID: studentID,addMode: isAddMode
            , service: this._KinshipService}
         
          
    
        });
        
        kinshipdialog.afterClosed().subscribe(result => {
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
editRecord(obj: IKinshipInfos): void {
  debugger;
  this.selectedRowId = obj.KinshipInfoID;
  if(this.formSecurity.CanEdit===true){
    const Kinshipdialog = this.dialog.open(KinshipDialogComponent, 
      {
      
        panelClass: 'custom1-dialog-container',
      disableClose:false,
      height: "450px",
      width: "550px",
      data : {obj: obj
        , service: this._KinshipService}
    });
    
    Kinshipdialog.afterClosed().subscribe(result => {
      let isOk: boolean = (result == undefined) ? false : result;
      if (isOk) {
        console.log(isOk);
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
deleteRecord(obj:IKinshipInfos){
 
  this.selectedRowId = obj.KinshipInfoID;
  if(this.formSecurity.CanDelete===true){
      let msg  = 'Are you sure you want to delete Kinship Information : '+obj.KinshipInfoID;

      const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '470px',
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
      
          this._KinshipService.deleteRecord(obj).subscribe(data=> {
        
          console.log(obj);
          this.notification.success('Succcessfully Deleted!');

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
