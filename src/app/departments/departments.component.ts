import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmentDialogComponent } from './Department_Dialog/department-dialog.component';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { DepartmentService } from './department.service';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { IPayDepartment } from 'app/shared/models/IPayDepartment';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers: [DepartmentService], 
})
export class DepartmentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: string;
  dataSource: MatTableDataSource<IPayDepartment>=new MatTableDataSource();
  isGridDataLoading : boolean;

  displayedColumns: string[] = ['Code' ,'Name', 'Description','ImageName','Status','Action'];
  formSecurity:IFormSecurity;
   
  
  constructor(
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService, private classService : DepartmentService) { }

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
    this.isGridDataLoading = true;
    this.classService.getDepartments()
            .subscribe(data1 => {

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

insertRecord(): void{
    this.classService.getFormSeucirty('PayDepartments').subscribe(data=>{
      data  = this.formSecurity;
      if(this.formSecurity.CanEdit===true)
      {
        const dialogRef = this.dialog.open(DepartmentDialogComponent, {
          height: "450px",
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
       
      
    });
    
  }
    
   
editRecord(obj: IPayDepartment): void {
  this.selectedRowId = obj.Code;
  if(this.formSecurity.CanEdit===true){
    const dialogRef = this.dialog.open(DepartmentDialogComponent, 
      
      {
        panelClass: 'custom1-dialog-container',
      disableClose:false,
      height: "450px",
      width: "550px",
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
deleteRecord(obj: IPayDepartment){
  debugger;
  this.selectedRowId = obj.Code;
  if(this.formSecurity.CanDelete===true){
      let msg  = 'Are you sure you want to delete designation : '+obj.Description;

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
          this.classService.deleteRecord(obj).subscribe(data=> {
          debugger;
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
