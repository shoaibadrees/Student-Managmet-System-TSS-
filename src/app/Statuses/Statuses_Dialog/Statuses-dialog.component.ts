import { IStatuses } from 'app/shared/models/IStatuses';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IPayDesignation } from 'app/shared/models/IPayDesignation';
import { AppService } from 'app/shared/services/app.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { StatusesComponent } from '../Statuses.component';
import { StatusesService } from '../Statuses.service';
//import { IPayDepartment } from 'app/shared/models/IPayDepartment';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './Statuses-dialog.component.html',
  styleUrls: ['./Statuses-dialog.component.css'],

  providers: [StatusesService]
})
export class StatusesDialogComponent implements OnInit {
form1: FormGroup;
title : string;


classObj: IStatuses =null;
validation_messages = {
  'code': [
    { type: 'required', message: 'Code is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
  ],
  'name': [
    { type: 'required', message: 'Name  is required' },
  ]
    
};


  constructor(
    public dialogRef: MatDialogRef<StatusesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: StatusesService,
    private notification : NotificationService) { 
      
      
      this.classObj = this.initObject();

      
      if(this.data == null){
      
      }
      if (data != null) {
       
        this.classObj = data.obj;
        this.title   = this.classObj.Name;
        this.service = data.service;
        // console.log(this.service);        
      }
    }
    enterKeyEvent()
{

 alert("my name is Umer");


}
  ngOnInit(): void {
    this.createForm();
    
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        code: [{value:null, disabled: true}, [Validators.required,Validators.maxLength(2)]],
        name: ["", [Validators.required]],
        Comments: ["", [Validators.required]],
        isActive : [false]
      });
  }

  setFormValues(obj: IStatuses){

    this.form1.patchValue({
        code: obj.Code,
        name:  obj.Name,
        Comments: obj.Comments,
        isActive: obj.isActive,
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IStatuses;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      
      this.classObj.Code = this.form1.get('code').value;
      
      this.classObj.Name = this.form1.get('name').value;
      this.classObj.Comments = this.form1.get('Comments').value;
      this.classObj.isActive=this.form1.get('isActive').value;
      
    }
    saveRecord() {
      
     
      this.getValuesIntoObject();
      console.log(this.classObj);
    
  
      //setting extra values 
      this.classObj.CreatedBy = this.appService.userId;
      this.classObj.ModifiedBy = this.appService.userId;
     
      
      this.service.updateRecord(this.classObj)
        .subscribe(data => {
          console.log(data);
        
          if (data == true) {

           
            //this.data.isOK = true;
            this.dialogRef.close(true);
            
          } else {
            console.log('Problem while saving the record');
            
           
            
          }
  
        },
        err => {
          
            
          
          console.log(err);

          
        }
        );
  
    }
    
     

}
