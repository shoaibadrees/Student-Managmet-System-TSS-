import { MatTooltipModule } from '@angular/material/tooltip';
import { IStudents } from './../shared/models/IStudents';
import { IClasses } from './../shared/models/IClasses';
import { ClassesService } from './../Classes/Classes.service';

import { IParentsInfo } from './../shared/models/IParentsInfo';
import { IStatuses } from 'app/shared/models/IStatuses';
import { ISections } from './../shared/models/ISections';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from './../Services/notification.service';
import { SectionsService } from './../Sections/Sections.service';
import { Component, ElementRef, OnInit } from '@angular/core';

import { StatusesService } from 'app/Statuses/Statuses.service';
import { StudentService } from './student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { MatDialog } from '@angular/material/dialog';



import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './Students.component.html',
  styleUrls: ['./Students.component.css'],
  providers: [StatusesService,SectionsService,StudentService,ClassesService,NotificationService]})

export class StudentsComponent implements OnInit {
  addMode: boolean= true;
  classObject: IStudents=null;
  studentID: number = null;
  form: FormGroup;
  emptyImagePath: any ='./assets/img/dummy.jpg'
  fileToUpload: FileList;
  loadingImage = './assets/img/empPhotoLoading.jpg';
  imageUrl:any=this.emptyImagePath;
  LoadSection: ISections[];
  LoadStatuses: IStatuses[];
  LoadClasses: IClasses[];

  constructor(
    private fb:FormBuilder,
    private notification : NotificationService,
    private _httpClient: HttpClient,
    private _router : Router,
    private _route: ActivatedRoute,
    private _sectionsService: SectionsService,
    private _statusService: StatusesService,
    private _classesService: ClassesService,
    private _studentService: StudentService,
    private el: ElementRef) { 
    
      this.classObject= this.initObj();
  }

  ngOnInit() {
   
   this. getDefinition()
    this.createForm();
    this.getStudentInfo();
   
  }

  initObj() :IStudents{
    var obj={} as IStudents;
    obj.StudentID = 0;
    return obj;
  }
  validation_messages = {
  
 
    'FirstName': [
      { type: 'required', message: ' First Name is required' },
      
    ],
    'LastName': [
      { type: 'required', message: 'Last Name  is required' },
    ],
    'Gender': [
      { type: 'required', message: 'Gender  is required' },
    ],
    'Religion': [
      { type: 'required', message: 'Religion  is required' },
    ],
    'Nationality': [
      { type: 'required', message: ' Nationality is required' },
      
      
    ],
  
    
    'DOB': [
      { type: 'required', message: ' Date of birth  is required' },
      ],
      'FatherName': [
        { type: 'required', message: ' FatherName is required' },
        
      ],
      'Statuses': [
        { type: 'required', message: ' Statuses is required' },
        
      ],
    
      'Classes': [
        { type: 'required', message: ' Classes is required' },
        
      ],
     
      'Sections': [
        { type: 'required', message: ' Statuses is required' },
        
      ],
      'City': [
        { type: 'required', message: ' City is required' },
        
      ],
    
      'Province': [
        { type: 'required', message: ' Province is required' },
        
      ],
     
      'Country': [
        { type: 'required', message: ' Country is required' },
        
      ],
      
     
    }
        
 
 

  private createForm()
  {

this.form= this.fb.group({
  Code :        [""],
  StudentID :   [""],
  isActive:     ["True"],
  ClassID:      ["",[Validators.required]],
  SectionID:    ["",[Validators.required]],
  FirstName:    ["",[Validators.required]],
  LastName:     ["",[Validators.required]],
  GenderID:     ["",[Validators.required]],
  DOB:          ["",[Validators.required]],
  Nationality:  ["",[Validators.required]],
  PlaceOfBirth: [""],
  FatherName:   ["",[Validators.required]],
  ReligionID:   ["",[Validators.required]],
  Address1:     [""],
  Address2:     [""],
  CityID:       ["",[Validators.required]],
  PostalCode:   ["54000"],
  ProvinceID:   ["",[Validators.required]],
  CountryID:    ["",[Validators.required]],
  TelephoneResidence: [""],
  TelephoneEmergency: [""],
  Photograph: [""],
 StatusID:       ["",[Validators.required]],
 Comments:     [""],
 CreatedOn:[""],
 CreatedBy:  [""],
 ModifiedOn:  [""],
 ModifiedBy: [""],
 HomeLanguages: [""],
 AdmissionClass:[""],
 FeePlanID: [""],
TemplateID:[""],
})
};

setFormValues(obj: IStudents)
  {
if(this.form==null)
{
  this.createForm();
}
this.form.patchValue({
  Code :        obj.Code,
  StudentID :   obj.StudentID,
  isActive:     obj.isActive,
  ClassID:      obj.ClassID,
  SectionID:    obj.SectionID,
  FirstName:    obj.FirstName,
  LastName:     obj.LastName,
  GenderID:     obj.GenderID,
  DOB:          obj.DateOfBirth,
  Nationality:  obj.Nationality,
  FatherName:   obj.FatherName,
  ReligionID:   obj.ReligionID,
  Address1:     obj.Address1,
  Address2:     obj.Address2,
  CityID:         obj.CityID,
  PostalCode:   obj.PostalCode,
  ProvinceID:   obj.ProvinceID,
  CountryID:    obj.CountryID,
  TelephoneResidence: obj.TelephoneEmergency,
  TelephoneEmergency: obj.TelephoneResidence,
  //Photograph: [""],
 StatusID:          obj.StatusID,
 Comments:          obj.Comments,
 CreatedBy:         obj.CreatedBy,
 ModifiedOn: obj.ModifiedOn,
 ModifiedBy: obj.ModifiedBy,
 HomeLanguages: obj.HomeLanguages,
 AdmissionClass: obj.AdmissionClass,
 FeePlanID: obj. FeePlanID,
TemplateID: obj.TemplateID

})

  }
getValuesIntoObject()
{
  this.classObject.StudentID=this.studentID;
this.classObject.Code =this.form.get('Code').value;
this.classObject.isActive= this.form.get('isActive').value;
this.classObject.ClassID= this.form.get('ClassID').value;
this.classObject.SectionID= this.form.get('SectionID').value;
this.classObject.FirstName= this.form.get('FirstName').value;
this.classObject.FirstName= this.form.get('LastName').value;
this.classObject.GenderID= this.form.get('GenderID').value;
this.classObject.Nationality= this.form.get('Nationality').value;
this.classObject.DateOfBirth= this.form.get('DOB').value;
this.classObject.PlaceOfBirth= this.form.get('PlaceOfBirth').value;
this.classObject.FatherName= this.form.get('FatherName').value;
this.classObject.ReligionID= this.form.get('ReligionID').value;
this.classObject.Address1= this.form.get('Address1').value;
this.classObject.Address2= this.form.get('Address2').value;

this.classObject.CityID= this.form.get('CityID').value;
this.classObject.PostalCode= this.form.get('PostalCode').value;
this.classObject.ProvinceID= this.form.get('ProvinceID').value;
this.classObject.CountryID= this.form.get('CountryID').value;
this.classObject.TelephoneResidence= this.form.get('TelephoneResidence').value;
this.classObject.TelephoneEmergency= this.form.get('TelephoneEmergency').value;
this.classObject.StatusID= this.form.get('StatusID').value;

this.classObject.Comments= this.form.get('Comments').value;
this.classObject.CreatedOn= this.form.get('CreatedOn').value;
this.classObject.CreatedBy= this.form.get('CreatedBy').value;
this.classObject.ModifiedOn= this.form.get('ModifiedOn').value;
this.classObject.ModifiedBy= this.form.get('ModifiedBy').value;

this.classObject.HomeLanguages= this.form.get('HomeLanguages').value;
this.classObject.AdmissionClass= this.form.get('AdmissionClass').value;
this.classObject.FeePlanID= this.form.get('FeePlanID').value;
this.classObject.TemplateID= this.form.get('TemplateID').value;

this.classObject.Photograph= this.form.get('Photograph').value;
}



deleteEmpPhoto() {
   
  this._studentService.deleteEmpPhoto(this.studentID)
    .subscribe(data => {

      if (data === true) {
        //this.snackBar.open('Error', 'Employee photo deleted successfully.', { duration: 2000 });
        this.imageUrl = this.emptyImagePath;
        //this.classObject.HasPhoto = false;
        // this.cd.markForCheck();
      }
    },
      err => {
        // this.snackBar.open('Error', 'Problem while deleting the photo', { duration: 4000 });
      }
    );
}

getDefinition()
{
  this.loadSections();
  this.loadStatuses();
  this.loadClasses();
}
loadSections()
{
  this._sectionsService.getSections().subscribe(
    sections=>{
      this.LoadSection= sections;
      console.log(this.LoadSection);
    }
  )
}
loadStatuses()
{
  this._statusService.getStatuses().subscribe(
    statuses=>{
      this.LoadStatuses= statuses;
      
    }
  )
}
loadClasses()
{
this._classesService.getClasses().subscribe(
  classes=>{
    this.LoadClasses= classes;
   
  }
)

}

downloadEmpPhoto() {
  this._studentService.downloadStudentPhoto(this.studentID)
    .subscribe(data => {

      this.showImageFromBytes(data);
    },
      err => {
        // this.imagePath = this.downloadingErrorPath;
       // this.snackBar.open('Error', 'Problem while downloading the file', { duration: 4000 });
      }
    );
}


uploadPhoto(file: FileList) {

  
  
  let photo : File = null;
  if(file && file[0]){
    photo = file[0];
  
    this.fileToUpload = file;
    
  }
  else { return; }
  if(this.studentID == null || this.studentID === 0 )
  {
    this.displayImage(file);
    return;
  }

 
  const formData = new FormData();
    formData.append('selectedFile', photo, photo.name);
   //formData.set('EmpCode', this.classObject.EmpCode.toString());
   formData.set('StudentID', this.classObject.StudentID.toString());
   this.imageUrl = this.loadingImage;
    this._studentService.uploadStudentPhoto(formData).subscribe(
      data=>{
        //this.classObject.HasPhoto = true;
        this.showImageFromBytes(photo);


      },
        err => {
         // this.classObject.HasPhoto=false;
          this.imageUrl = this.emptyImagePath;
          
        }
    );
    


  //this.fileToUpload = file.item(0);

  //Show image preview
  //let reader = new FileReader();
  //reader.onload = (event: any) => {
   // this.imageUrl = event.target.result;
  //}
 // reader.readAsDataURL(this.fileToUpload);
 }
 showImageFromBytes(imageBytes) {
  const reader = new FileReader();

  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
    
  };

  if (imageBytes) {
    reader.readAsDataURL(imageBytes);
  }
}

displayImage(file : FileList){
 this.imageUrl =file[0];
 const reader = new FileReader();
 reader.onload= (event:any)=>{
   this.imageUrl=event.target.result;
 
 };

 if(file){
   reader.readAsDataURL(this.imageUrl);
 } 
}

  saveRecord(){ 

  if(!this.validateForm()){
    this.notification.fail("Please Fill all the required Field");
    //focus on errror fields 
    for (const key of Object.keys(this.form.controls)) {
      if (this.form.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname =' + key + ']');
        invalidControl.focus();
        break;
     }
  }
  
    return;
  }
 
   const chkImage = this.form.get('Photograph').value;
    if(this.classObject.StudentID==0){
      
      if(chkImage == null || chkImage == undefined || chkImage == '')
      {
        this.notification.fail("Please Upload Image");
        return ;
      }
    }
    //this.classObject.HasPhoto=true;
    this.getValuesIntoObject();
      this._studentService.insertOrUpdateRecord(this.classObject).subscribe(data=>{
        if(data && data>0 ){
          
          if(this.classObject.StudentID== null   ){ // insert case
            //this.classObject.HasPhoto=true;
            this.classObject.StudentID = data;
            this.studentID = data;
             
            this.uploadPhoto(this.fileToUpload);
            this.notification.success("Successfully Inserted");             
          } else {
            this.notification.success("succesfully updated");
          }
  
          // this._router.navigate(["/Employees"]);
        }
      },
      err=>{
        console.log("error in inserting record");
      }
      );
   
  }  

  getStudentInfo(){
     this._route.params.subscribe(params=>{
       this.studentID = params['id'];
     });
  
  if  (this.studentID){ 
      this._studentService.getStudentsOnId(this.studentID).subscribe(data=>{
        this.classObject = data;
        this.setFormValues(this.classObject);  

       // if(this.classObject.HasPhoto)
        //{
          this.downloadEmpPhoto();
        //}
        
       
    },
    err=>{
      console.log(err);
    });
  
   }
    
  }
 

 /*  saveRecord() {
      debugger;
     
    this.getValuesIntoObject();
  

    
     this._studentService.insertOrUpdateRecord(this.classObject)
      .subscribe(data => {
        console.log(data);
      
       

      },
      err => {
        
          
        
        console.log(err);

        
      }
      );

  } */
private validateForm(): boolean {
  //  mark all fields as touched
  // Object.values(this.form.controls).forEach(control => {
     //control.markAsTouched({ onlySelf: true });
  //});
  this.form.markAllAsTouched();
  return this.form.valid;
 }
}
