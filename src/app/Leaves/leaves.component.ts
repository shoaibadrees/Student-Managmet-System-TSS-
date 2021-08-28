import { IPayLeaves } from './../shared/models/IPayLeaves';
import { LeaveService } from './leaves.service';
import { Component, OnInit, ViewChild } from '@angular/core';


import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';


import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { IPayDepartment } from 'app/shared/models/IPayDepartment';


import { IPayShifts } from 'app/shared/models/IPayShifts';
import { LeavesDialogComponent } from './leaves_Dialog/leaves-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
  providers: [LeaveService],
})
export class LeavesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: number;
  dataSource: MatTableDataSource<IPayLeaves>=new MatTableDataSource();
  isGridDataLoading : boolean;

  displayedColumns: string[] = ['ID' ,'Date','From', 'To','Days','EmpCode','Remarks','Action'];
  formSecurity:IFormSecurity;
   

  constructor(
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService, private classService : LeaveService) { }

ngOnInit(): void {
    debugger;

    this.classService.getFormSeucirty('PayDepartments')
        .subscribe(data => {
          this.formSecurity = data;
          if(this.formSecurity.CanView === true)
          {

            this.refreshGrid();

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
  debugger;  
    this.isGridDataLoading = true;
    this.classService.getDepartments()
            .subscribe(data1 => {
              

              this.dataSource = new MatTableDataSource(data1);
              console.log(this.dataSource);
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

   this.classService.getFormSeucirty('PayShifts').subscribe(data=>{
      data  = this.formSecurity;
      
      if(this.formSecurity.CanEdit ===true)
      {
        const dialogRef = this.dialog.open(LeavesDialogComponent, {
          height: "650px",
          width: "550px",
          data : null,
          panelClass: 'custom1-dialog-container',
          
    
        });
        
        dialogRef.afterClosed().subscribe(result => {
          let isOk: boolean = (result == undefined) ? false : result;
          if (isOk) {
            console.log(isOk);
            this.notification.success('Succcessfully Inserted!')
            this.refreshGrid();
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
       
      }
      );
    
    
   
}
editRecord(obj: IPayLeaves): void {
  this.selectedRowId = obj.ID;
  if(this.formSecurity.CanEdit===true){
    const dialogRef = this.dialog.open(LeavesDialogComponent, 
      
      {
        panelClass: 'custom1-dialog-container',
      disableClose:false,
      height: "550px",
      width: "500px",
      data : {obj: obj

        , service: this.classService}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      let isOk: boolean = (result == undefined) ? false : result;
      if (isOk) {
        console.log(isOk);
        this.notification.success('Succcessfully Updated!');
        console.log('Updated')
        this.refreshGrid();
        
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
deleteRecord(obj: IPayLeaves){
  
  this.selectedRowId = obj.ID;
  if(this.formSecurity.CanDelete===true){
      let msg  = 'Are you sure you want to delete designation : '+obj.ID;

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
     
          this.classService.deleteRecord(obj).subscribe(data=> {
        
          console.log(obj);
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
