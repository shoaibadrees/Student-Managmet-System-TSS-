import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IPayDesignation } from 'app/shared/models/IPayDesignation';
import { AppService } from 'app/shared/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { DesignationComponent } from '../designation.component';
import { DesignationService } from '../designation.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-designation-dialog',
  templateUrl: './designation-dialog.component.html',
  styleUrls: ['./designation-dialog.component.css'],

  providers: [DesignationService]
})
export class DesignationDialogComponent implements OnInit {
form1: FormGroup;
title : string;

classObj: IPayDesignation =null;
validation_messages = {
  'code': [
    { type: 'required', message: 'Code is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
  ],
  'name': [
    { type: 'required', message: 'Name  is required' },
  ],
    'description': [
    { type: 'required', message: ' description is required' },
  ]
};

  constructor(
    public dialogRef: MatDialogRef<DesignationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: DesignationService,
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

  ngOnInit(): void {
    this.createForm();
    debugger;
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        code: [{value:null, disabled: true}, [Validators.required,Validators.maxLength(2)]],
        name: ["", [Validators.required]],
        description: ["", [Validators.required]]
      });
  }

  setFormValues(obj: IPayDesignation){
debugger;
    this.form1.patchValue({
        code: obj.Code,
        name:  obj.Name,
        description: obj.Description
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IPayDesignation;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      
      debugger;
      this.classObj.Code = this.form1.get('code').value;
      
      this.classObj.Name = this.form1.get('name').value;
      this.classObj.Description = this.form1.get('description').value;
      
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
