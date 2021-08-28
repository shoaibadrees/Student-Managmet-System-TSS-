import { ISections } from 'app/shared/models/ISections';


import { SectionsDialogComponent } from './Sections_Dialog/Sections-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { SectionsService } from './Sections.service';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { IPayDepartment } from 'app/shared/models/IPayDepartment';


@Component({
  selector: 'app-departments',
  templateUrl: './Sections.component.html',
  styleUrls: ['./Sections.component.scss'],
  providers: [SectionsService], 
})


export class SectionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: string;
  dataSource: MatTableDataSource<ISections>=new MatTableDataSource();
  isGridDataLoading : boolean;

  displayedColumns: string[] = ['SectionID','Code' ,'Name', 'Comments','isActive','Action'];
  formSecurity:IFormSecurity;
   

  constructor(
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService, private classService : SectionsService) { }

ngOnInit(): void {
    
  
    this.classService.getFormSeucirty('spSections')
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
    this.classService.getSections()
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
 
    this.classService.getFormSeucirty('spSections').subscribe(data=>{
      data  = this.formSecurity;
      if(this.formSecurity.CanEdit===true)
      {
        const dialogRef = this.dialog.open(SectionsDialogComponent, {
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
editRecord(obj: ISections): void {
  this.selectedRowId = obj.Code;
  if(this.formSecurity.CanEdit===true){
    const dialogRef = this.dialog.open(SectionsDialogComponent, 
      
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
deleteRecord(obj: ISections){
  debugger;
  this.selectedRowId = obj.Code;
  if(this.formSecurity.CanDelete===true){
      let msg  = 'Are You Sure You Want to Delete this Sections:' +obj.Code;

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
