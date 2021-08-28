import { IParentsInfo } from './../../shared/models/IParentsInfo';
import { ParentsInfoService } from './../ParentsInfo.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IPayDesignation } from 'app/shared/models/IPayDesignation';
import { AppService } from 'app/shared/services/app.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { ParentsInfoComponent } from '../ParentsInfo.component';

//import { IPayDepartment } from 'app/shared/models/IPayDepartment';

@Component({
  
  selector: 'app-department-dialog',
  templateUrl: './ParentsInfo-dialog.component.html',
  styleUrls: ['./ParentsInfo-dialog.component.css'],

  providers: [ParentsInfoService]
})
export class ParentsInfoDialogComponent implements OnInit {
form1: FormGroup;


classObj: IParentsInfo =null;
validation_messages = {
  'code': [
    { type: 'required', message: 'Code is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
  ],
  'name': [
    { type: 'required', message: 'Name  is required' },
  ],
  
    
};


  constructor(
    public dialogRef: MatDialogRef<ParentsInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: ParentsInfoService,
    private notification : NotificationService) { 
      
      
      this.classObj = this.initObject();

      
      if(this.data == null){
      
      }
      if (data != null) {
       
        this.classObj = data.obj;
        this.service = data.service;
        // console.log(this.service);        
      }
    }

  ngOnInit(): void {
    this.createForm();
    
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        code: [{value:null, disabled: true}, [Validators.required,Validators.maxLength(2)]],
        name: ["", [Validators.required]],
        Comments: [""],
       //NoInSequence: ["",Validators.required],
        isActive : [''],
      });
  }

  setFormValues(obj: IParentsInfo){

    this.form1.patchValue({
        code: obj.Code,
        name:  obj.Name,
        Comments: obj.Comments,
       // NoInSequence:obj.NoInSequence,
        isActive: obj.isActive,
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IParentsInfo;
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
          debugger;
          if (data) {

           debugger;
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
