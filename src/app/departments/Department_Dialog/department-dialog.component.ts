import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IPayDesignation } from 'app/shared/models/IPayDesignation';
import { AppService } from 'app/shared/services/app.service';


import { DragDropModule } from '@angular/cdk/drag-drop';

import { DepartmentService } from '../department.service';
import { IPayDepartment } from 'app/shared/models/IPayDepartment';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css'],

  providers: [DepartmentService]
})
export class DepartmentDialogComponent implements OnInit {
form1: FormGroup;
title : string;
imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;



classObj: IPayDepartment =null;
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
  ],

  'imagename': [
    { type: 'required', message: ' Image Name is required' },
  ]
};


  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: DepartmentService,
    private notification : NotificationService, private imageService : DepartmentService) { 
      
      
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
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        code: [{value:null, disabled: true}, [Validators.required,Validators.maxLength(2)]],
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
        imagename: ["", [Validators.required]],
        status : [false]
      });
  }

  setFormValues(obj: IPayDepartment){
debugger;
    this.form1.patchValue({
        code: obj.Code,
        name:  obj.Name,
        description: obj.Description,
        imagename: obj.ImageName,
        status: obj.Status
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IPayDepartment;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      
      debugger;
      this.classObj.Code = this.form1.get('code').value;
      
      this.classObj.Name = this.form1.get('name').value;
      this.classObj.Description = this.form1.get('description').value;
      this.classObj.ImageName = this.form1.get('imagename').value;
      this.classObj.Status=this.form1.get('status').value;
      
    }
    

    saveRecord() {
      
     
      this.getValuesIntoObject();
      console.log(this.classObj);
    
  
      //setting extra values 
      this.classObj.AddBy = this.appService.userId;
      this.classObj.EditBy = this.appService.userId;
      
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
    
     
    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);
  
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    }

    
   

}
