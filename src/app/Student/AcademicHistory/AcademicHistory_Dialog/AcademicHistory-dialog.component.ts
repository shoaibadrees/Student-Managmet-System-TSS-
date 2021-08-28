import { IClasses } from './../../../shared/models/IClasses';
import { ClassesService } from './../../../Classes/Classes.service';
import { IspStudentAcademicDetails } from './../../../shared/models/IspStudentAcademicDetail';
import { AppService } from './../../../shared/services/app.service';
import { NotificationService } from './../../../Services/notification.service';
import { AcademicHistoryService } from './../AcademicHistory.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './AcademicHistory-dialog.component.html',
  styleUrls: ['./AcademicHistory-dialog.component.css'],

  providers: [AcademicHistoryService,ClassesService]
})
export class AcademicHistoryDialogComponent implements OnInit {
form1: FormGroup;
LoadClasses: IClasses[];
studentID: number = 0;
title : string;
classObj: IspStudentAcademicDetails=null
validation_messages = {
  'PreviousSchoolID': [
    { type: 'required', message: 'PreviousSchoolID is required' },
     
  ],
  'Class': [
    { type: 'required', message: 'Class is required' },
     
  ],
  'Institute': [
    { type: 'required', message: 'Institute  is required' },
  ],
    'DateFrom': [
    { type: 'required', message: ' DateFrom is required' },
  ],
  'DateTo': [
    { type: 'required', message: ' Date To is required' },
  ]
};


  constructor(
    public dialogRef: MatDialogRef<AcademicHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    @Inject(MAT_DIALOG_DATA) public data1: any, 
    private fb: FormBuilder,private appService: AppService,private service:AcademicHistoryService,private _classService: ClassesService,
    private notification : NotificationService) { 
      this.classObj = this.initObject();
      if(this.data == null){
      console.log('error ');
      }
      if (data != null) {
  
 if(data.addMode===true)
 {
   this.studentID= data.studentID;
 }
 else
 {
      this.classObj= data.obj;
        this.service = data.service;
        this.studentID= this.classObj.StudentID;
 }
      
        // console.log(this.service);        
      }
    }

  ngOnInit(): void {
    this.createForm();
    this.loadClasses();
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
      PreviousSchoolID: [{value:null, disabled: true}, [Validators.required]],
      Class: ["", [Validators.required]],
      Institute: ["", [Validators.required]],
      DateFrom : ["", [Validators.required]],
      DateTo : ["", [Validators.required]],
      });
  }

  setFormValues(obj: IspStudentAcademicDetails){
    debugger;
    this.form1.patchValue({
      
      PreviousSchoolID: obj.PreviousSchoolID,
        Class:        obj.Class,
        Institute:    obj.Institute,
        DateFrom:     obj.DateFrom,
        DateTo:       obj.DateTo
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IspStudentAcademicDetails;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      debugger;
      this.classObj.PreviousSchoolID = this.form1.get('PreviousSchoolID').value;
      this.classObj.StudentID= this.studentID;
      this.classObj.Class = this.form1.get('Class').value;
      this.classObj.Institute = this.form1.get('Institute').value;
      this.classObj.DateFrom=this.form1.get('DateFrom').value;
      this.classObj.DateTo=this.form1.get('DateTo').value;
    }
    saveRecord() 
    {
      this.getValuesIntoObject();
      console.log(this.classObj);
    //setting extra values 
     this.service.insertOrUpdateRecord(this.classObj,this.studentID)
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
loadClasses()
{
this._classService.getClasses().subscribe(
  classes=>{
    this.LoadClasses= classes;
   
  }
)

}
     

}
