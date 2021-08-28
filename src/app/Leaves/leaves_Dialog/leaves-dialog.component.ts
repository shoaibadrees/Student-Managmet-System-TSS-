import { IPayLeaves } from './../../shared/models/IPayLeaves';
import { LeaveService } from './../leaves.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';

import { AppService } from 'app/shared/services/app.service';


import { DragDropModule } from '@angular/cdk/drag-drop';


import { IPayDepartment } from 'app/shared/models/IPayDepartment';



import { IPayShifts } from 'app/shared/models/IPayShifts';



@Component({
  selector: 'app-shift-dialog',
  templateUrl: './leaves-dialog.component.html',
  styleUrls: ['./Leaves-dialog.component.css'],

  providers: [LeaveService]
})
export class LeavesDialogComponent implements OnInit {
form1: FormGroup;
title : string;



classObj: IPayLeaves =null;
validation_messages = {
  'ID': [
    { type: 'required', message: 'ID is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
  ],
  'Date': [
    { type: 'required', message: 'Date  is required' },
  ],

  'From': [
    { type: 'required', message: ' From Date Time is required' },
    
  ],
  'To': [
    { type: 'required', message: ' ToDate  is required' },
    ],
    'Days':[
      {type: 'required', message: 'No Of Leaves is Required'},
      
    ],
    
    'Type':[
      {type: 'required', message: 'leave type is Required'},
    ]
};
leaveType =[
  {value:'1', view: 'Annual'},
  {value:'2', view: 'Medical'},
  {value:'3', view: 'Casual'}
]

  constructor(
    public dialogRef: MatDialogRef<LeavesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service:LeaveService,
    private notification : NotificationService) { 
      
      
      this.classObj = this.initObject();
      if(this.data == null){
      
      }
      if (data != null) {
       
        this.classObj = data.obj;
        console.log(this.classObj);
        //this.title   = this.classObj.Name;
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
        ID: [{disabled: true}, [Validators.required,Validators.maxLength(2)]],
        Date: ['', [Validators.required]],
        From: ['',[Validators.required]],
        To: ['',[Validators.required]],
        Days:['',[Validators.required]],
        Type:['',[Validators.required]],
        Remarks:[true,[Validators.required]]
        
       
      });
  }

  setFormValues(obj: IPayLeaves){

    this.form1.patchValue({
        ID: obj.ID,
        Date:  obj.Date,
        From:  obj.From,
        To: obj.To,
        Days: obj.Days,
        Type : obj.Type,
        Remarks: obj.Remarks,
        

        
        
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IPayLeaves;
        //default values      
  
        return obj;
      }
    }
    
    private getValuesIntoObject() {
      
      debugger;
      this.classObj.ID = this.form1.get('ID').value;
      
      this.classObj.Date = this.form1.get('Date').value;
      this.classObj.From = this.form1.get('From').value;
      this.classObj.To= this.form1.get('To').value;
      this.classObj.Days = this.form1.get('Days').value;
      this.classObj.Type = this.form1.get('Type').value;
      this.classObj.Remarks = this.form1.get('Remarks').value;
      
      
    }
    saveRecord() {
      debugger;
     
      this.getValuesIntoObject();
      console.log(this.classObj);
    
  
      //setting extra values 
      //this.classObj.AddBy = this.appService.userId;
     // this.classObj.EditBy = this.appService.userId;
     
      
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
