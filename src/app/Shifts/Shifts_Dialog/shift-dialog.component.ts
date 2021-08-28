import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';

import { AppService } from 'app/shared/services/app.service';


import { DragDropModule } from '@angular/cdk/drag-drop';


import { IPayDepartment } from 'app/shared/models/IPayDepartment';

import { ShiftsService } from 'app/Shifts/shift.service';
import { ShiftsComponent } from '../shifts.component';
import { IPayShifts } from 'app/shared/models/IPayShifts';



@Component({
  selector: 'app-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['./shift-dialog.component.css'],

  providers: [ShiftsService]
})
export class ShiftDialogComponent implements OnInit {
form1: FormGroup;
title : string;



classObj: IPayShifts =null;
validation_messages = {
  'code': [
    { type: 'required', message: 'Code is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
  ],
  'name': [
    { type: 'required', message: 'Name  is required' },
  ],

  'startTime': [
    { type: 'required', message: ' Start Time is required' },
    
  ],
  'endTime': [
    { type: 'required', message: ' End Time is required' },
    ],
    'duration':[
      {type: 'required', message: 'Duration is Required'},
      
    ],
    
    'relaxation':[
      {type: 'required', message: 'relaxation is Required'},
    ]
};


  constructor(
    public dialogRef: MatDialogRef<ShiftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: ShiftsService,
    private notification : NotificationService) { 
      
      
      this.classObj = this.initObject();


      
      if(this.data == null){
      
      }
      if (data != null) {
       
        this.classObj = data.obj;
        console.log(this.classObj);
        this.title   = this.classObj.Name;
        this.service = data.service;
        // console.log(this.service);        
      }
    }

  ngOnInit(): void {
    
    this.createForm();
    debugger;
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        code: [{value:null, disabled: true}, [Validators.required,Validators.maxLength(2)]],
        name: ["", [Validators.required]],
        
        startTime: ["13:00",[Validators.required]],
        endTime: ["13:00",[Validators.required]],
        duration:['',[Validators.required]],
        relaxation:['',[Validators.required]],
        nextDay:[true,[Validators.required]]
        
       
      });
  }

  setFormValues(obj: IPayShifts){
debugger;
    this.form1.patchValue({
        code: obj.Code,
        name:  obj.Name,
        startTime: obj.Start1,
        endTime: obj.End1,
        duration : obj.Duration,
        relaxation: obj.Relaxation,
        nextDay:obj.NextDay

        
        
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IPayShifts;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      
      debugger;
      this.classObj.Code = this.form1.get('code').value;
      
      this.classObj.Name = this.form1.get('name').value;
      this.classObj.Start1 = this.form1.get('startTime').value;
      this.classObj.End1 = this.form1.get('endTime').value;
      this.classObj.Duration = this.form1.get('duration').value;
      this.classObj.Relaxation = this.form1.get('relaxation').value;
      this.classObj.NextDay = this.form1.get('nextDay').value;
      
      
    }
    saveRecord() {
      
     
      this.getValuesIntoObject();
      console.log(this.classObj);
    
  
      //setting extra values 
      this.classObj.AddBy = this.appService.userId;
      this.classObj.EditBy = this.appService.userId;
      debugger;
      
      this.service.updateRecord(this.classObj)
        .subscribe(data => {
          console.log(data);
          debugger;
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
