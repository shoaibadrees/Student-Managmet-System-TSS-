import { ISections } from 'app/shared/models/ISections';


import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IPayDesignation } from 'app/shared/models/IPayDesignation';
import { AppService } from 'app/shared/services/app.service';


import { DragDropModule } from '@angular/cdk/drag-drop';

import { SectionsService } from '../Sections.service';

//import { IPayDepartment } from 'app/shared/models/IPayDepartment';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './Sections-dialog.component.html',
  styleUrls: ['./Sections-dialog.component.css'],

  providers: [SectionsService]
})
export class SectionsDialogComponent implements OnInit {
form1: FormGroup;
title : string;



classObj: ISections =null;
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
    public dialogRef: MatDialogRef<SectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: SectionsService,
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

  setFormValues(obj: ISections){

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
        var obj = {} as ISections;
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
