import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';

import { AppService } from 'app/shared/services/app.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { IPayShifts } from 'app/shared/models/IPayShifts';
import { AdvanceComponent } from '../advance.component';
import { IPayAdvance } from 'app/shared/models/IPayAdvance';
import { AdvanceService } from '../advance.service';




@Component({
  selector: 'app-shift-dialog',
  templateUrl: './advance-dialog.component.html',
  styleUrls: ['./advance-dialog.component.css'],

  providers: [AdvanceService]
})
export class AdvanceDialogComponent implements OnInit {
form1: FormGroup;
title : string;



classObj: IPayShifts =null;
validation_messages = {
  'ID': [
    { type: 'required', message: 'ID is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
  ],
  'Amount': [
    { type: 'required', message: 'Amount  is required' },
  ],
  'PaidAmount': [
    { type: 'required', message: 'PaidAmount  is required' },
  ],

  'Date': [
    { type: 'required', message: ' Date is required' },
    
  ],
  'EffectiveDate': [
    { type: 'required', message: ' Effective Date is required' },
    ],
    'Description': [
      { type: 'required', message: ' Description is required' },
      
    ],
    'noOfInstallment':[
      {type: 'required', message: 'noOfInstallment is Required'},
      
    ],
    
    'installmentAmount':[
      {type: 'required', message: 'installmentAmount is Required'},
    ]
};


  constructor(
    public dialogRef: MatDialogRef<AdvanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: AdvanceService,
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
        ID: [{value:null, disabled: true}, [Validators.required,Validators.maxLength(2)]],
        date: ["", [Validators.required]],
        
        amount: ["",[Validators.required]],
        paidAmount: ["",[Validators.required]],
        effectiveDate:['',[Validators.required]],
        months: ["1", [Validators.required]],
        year: ["2", [Validators.required]],
        description:['',[Validators.required]],
        paymentType:['',[Validators.required]],
        employee:['hamza',[Validators.required]],
         name: ["", [Validators.required]],
        designation: ["", [Validators.required]],
        department:['',[Validators.required]],
        noOfInstallment: ["1", [Validators.required]],
        installmentAmount: ["2", [Validators.required]],
        
       
      });
  }

  setFormValues(obj: any ){
debugger;
    this.form1.patchValue({
        
        ID: obj.ID,
        date:  obj.Date,
        amount: obj.Amount,
        paidAmount: obj.PaidAmount,
        effectiveDate: obj.EffDate,
        paymentType : obj.isLoan,
        noOfInstallment: obj.NoOfInst,
        installmentAmount: obj.InsAmount
        

        
        
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
    //PaymentType: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
    PaymentType  = [
      {value: '0', viewValue: 'Loan'},
      {value: '1', viewValue: 'Advance'},
      
    ];
  
    
     

}
