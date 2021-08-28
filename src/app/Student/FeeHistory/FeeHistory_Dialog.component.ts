import { Subscription } from 'rxjs';
import { IFeeHistory } from './../../shared/models/IFeeHistory';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from 'app/shared/services/app.service';
import { NotificationService } from 'app/Services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeeHistoryDialogService } from './FeeHistory_Dialog.service';
import 'rxjs/Rx'; 

@Component({
  selector: 'app-AcademicHistory_Dialog',
  templateUrl: './FeeHistory_Dialog.component.html',
  styleUrls: ['./FeeHistory_Dialog.component.css'],
  providers:[FeeHistoryDialogService]
})
export class FeeHistoryDialogComponent implements OnInit {

form1: FormGroup;
FeePlanLoad: IFeeHistory[]=null;
LoadFeeTemplate: IFeeHistory[];
constructor( public dialogRef: MatDialogRef<FeeHistoryDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
    
      private fb: FormBuilder,private appService: AppService,
      private notification : NotificationService, private _FeeHistoryDialogService: FeeHistoryDialogService) {}
  
    ngOnInit(): void {
      this.createForm();
      this.getDefinition();
    
    }
    createForm(){
      this.form1 = this.fb.group({
         FeePlan: [""],
          FeeTemplate: [""]
       
        });
    }
  loadFeePlan()
  {
    this._FeeHistoryDialogService.getFeePlan().subscribe(
      loadFee=>{
        debugger;
        this.FeePlanLoad= loadFee;
      
  
      }
    )

  }

   loadFeeTemplate()
  {
  
this._FeeHistoryDialogService.getFeeTemplate().subscribe(loadTemplate=>
  {
    this.LoadFeeTemplate= loadTemplate;
  }
  ) 
 } 
   
  getDefinition()
    {
      this.loadFeePlan();
      this.loadFeeTemplate();
     
    }
  
  }