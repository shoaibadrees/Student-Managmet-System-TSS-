import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from 'app/Services/notification.service';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { IEmployee } from 'app/shared/models/IEmployee';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { EmployeeService } from './Employee.Service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService], 
})
export class EmployeeComponent implements OnInit {
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  selectedRowId: string;
  isGridDataLoading : boolean;
  dataSource: MatTableDataSource<IEmployee>=new MatTableDataSource();
   
  displayedColumns: string[] = ['Code' ,'Name', 'DOB','Religion', 'Qualification', 'Sex', 'Status', 'Action'];
  formSecurity:IFormSecurity;

  constructor(  
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService, private classService : EmployeeService) { }

  ngOnInit(): void {
    this.refreshGrid();
  }

  /**
   * name
   */
  
//   getNewRecord(): void{
//   this.classService.getNewEmployees()
//             .subscribe(data1 => {

//               this.dataSource = new MatTableDataSource(data1);
//               this.dataSource.paginator = this.paginator;
//               this.dataSource.sort = this.sort;
              

//               this.isGridDataLoading = false;

//             },
//               err => {
//                 this.isGridDataLoading = false;
//                 console.log(err);
//               }
//             );
// }
  refreshGrid(): void{
   
    this.isGridDataLoading = true;
    this.classService.getEmployees()
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
    debugger;
    this.classService.getFormSeucirty('Employee').subscribe(data=>{
      this.formSecurity = data;
      if(this.formSecurity.CanEdit===true)
      {
        const dialogRef = this.dialog.open(EmployeeDialogComponent, {
          height: "650px",
          width: "750px",
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


  editRecord(obj: IEmployee): void {
    debugger;
    this.selectedRowId = obj.Code;
    if(this.formSecurity.CanEdit===true){
      const dialogRef = this.dialog.open(EmployeeDialogComponent, 
        
        {
          panelClass: 'custom1-dialog-container',
        disableClose:false,
        height: "650px",
        width: "750px",
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



  deleteRecord(obj: IEmployee){
    debugger;
    this.selectedRowId = obj.Code;
    if(this.formSecurity.CanDelete===true){
        let msg  = 'Are you sure you want to delete Employee : '+obj.Name;
  
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
this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


}
