declare var $: any;
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Input } from '@angular/core';
import { DesignationService } from './designation.service';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { throwError as observableThrowError } from 'rxjs';
import { IPayDesignation } from 'app/shared/models/IPayDesignation';
import { DesignationDialogComponent } from './designation-dialog/designation-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {map} from 'rxjs/operators';
import { NotificationService } from 'app/Services/notification.service';
import { DragDropModule } from '@angular/cdk/drag-drop';




@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss'],
  providers: [DesignationService], 
})
export class DesignationComponent implements OnInit,AfterViewInit  {

isGridDataLoading = false;
selectedRowId: string;

dataSource: MatTableDataSource<IPayDesignation>=new MatTableDataSource();

  formSecurity:IFormSecurity;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Code' ,'Name', 'Description','Action'];
  
  constructor(private classService: DesignationService,
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService
  ) { }

  
  ngOnInit(): void {
    debugger;

    this.classService.getFormSeucirty('PayDesignations')
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

  
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
  }

  refreshGrid(): void{
    this.isGridDataLoading = true;
    this.classService.getDesignations()
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
    
    const dialogRef = this.dialog.open(DesignationDialogComponent, {
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

  editRecord(obj: IPayDesignation): void {
    this.selectedRowId = obj.Code;
    if(this.formSecurity.CanEdit===true){
      const dialogRef = this.dialog.open(DesignationDialogComponent, 
        
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

  deleteRecord(obj: IPayDesignation){
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
