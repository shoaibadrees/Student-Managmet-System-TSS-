import { IClasses } from './../../../shared/models/IClasses';
import { ClassesService } from './../../../Classes/Classes.service';
import { IKinshipInfos } from './../../../shared/models/IKinshipInfo';
import { KinshipService } from './../Kinship.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { AppService } from 'app/shared/services/app.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-department-dialog',
  templateUrl: './Kinship-dialog.component.html',
  styleUrls: ['./Kinship-dialog.component.css'],
  providers: [KinshipService,ClassesService]
})
export class KinshipDialogComponent implements OnInit {
form1: FormGroup;
studentID: number;
classObj: IKinshipInfos =null;
LoadClasses: IClasses[];
validation_messages = {
  'Name': [
    { type: 'required', message: 'Name is required' },
  
  ],
  'Class': [
    { type: 'required', message: 'Class  is required' },
  ],
    'Relation': [
    { type: 'required', message: ' Relation is required' },
  ]
};
  constructor(
    public dialogRef: MatDialogRef<KinshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service: KinshipService,private _ClassService: ClassesService,
    private notification : NotificationService) {
      this.classObj = this.initObject();
       if(this.data == null){
      }
      if (data != null) {
        debugger;
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
      Name: ["", [Validators.required]],
        Class: ["", [Validators.required]],
        Relation: ["", [Validators.required]],
       
      });
  }

  setFormValues(obj: IKinshipInfos){
    this.form1.patchValue({
      KinshipInfoID: obj.KinshipInfoID,
        Name: obj.Name,
        Class:  obj.Class,
        Relation: obj.Relation

    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as IKinshipInfos;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      this.classObj.KinshipInfoID= this.form1.get('KinshipInfoID').value;
      this.classObj.Name = this.form1.get('Name').value;
      this.classObj.Class = this.form1.get('Class').value;
      this.classObj.Relation = this.form1.get('Relation').value;
     
      
    }

loadClasses()
{
this._ClassService.getClasses().subscribe(
  classes=>{
    this.LoadClasses= classes;
   
  }
)

}
    saveRecord() {
      this.getValuesIntoObject();
      console.log(this.classObj);
      debugger;
      this.service.insertOrUpdateRecord(this.classObj)
        .subscribe(data => {
          console.log(data);
          debugger;
          if (data==true) {
            this.data.isOK = true;
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
    
     
closeDialog()
{
  this.dialogRef.close();
}
}
