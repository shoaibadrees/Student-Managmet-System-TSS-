import { IClasses } from './../../shared/models/IClasses';
import { ClassesService } from './../../Classes/Classes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'app/Services/notification.service';
import { AppService } from 'app/shared/services/app.service';

@Component({
  selector: 'app-AcademicHistory_Dialog',
  templateUrl: './AddmissionHistory_Dialog.component.html',
  styleUrls: ['./AddmissionHistory_Dialog.component.css'],
  providers:[ClassesService]
})
export class AdmissionHistoryDialogComponent implements OnInit {
form1: FormGroup;
LoadClasses: IClasses[];
  constructor( public dialogRef: MatDialogRef<AdmissionHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  
    private fb: FormBuilder,private appService: AppService,
    private notification : NotificationService,private _classesService: ClassesService) {}

  ngOnInit(): void {
    this.createForm();
    this.getDefinition();
  
  }


  createForm(){
    this.form1 = this.fb.group({
       classofAdmission: [""],
        languageSpoken: [""]
     
      });
  }

  getDefinition()
  {
    
    this.loadClasses();
  }


loadClasses()
{
this._classesService.getClasses().subscribe(
  classes=>{
    this.LoadClasses= classes;
  
  }
)

}
}
