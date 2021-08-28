import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'app/Services/notification.service';
import { IEmployee } from 'app/shared/models/IEmployee';
import { AppService } from 'app/shared/services/app.service';
import { EmployeeComponent } from '../employee.component';
import { EmployeeService } from '../Employee.Service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],

  providers: [EmployeeService]
})
export class EmployeeDialogComponent implements OnInit {
  form1: FormGroup;
  title: string;
  emptyImagePath: any = './assets/img/dummy.jpg';
  classObject: IEmployee = null;
  imageUrl: any = this.emptyImagePath;
  fileToUpload: File = null;
  imageId:number=0;

  dataSource: MatTableDataSource<IEmployee>=new MatTableDataSource();
  classObj: IEmployee = null;



  //logic starts here...

  validation_messages = {
    'code': [
      { type: 'required', message: 'Code is required' },
      { type: 'maxlength', message: 'maximum length is 2' },
    ],
    'name': [
      { type: 'required', message: 'Name  is required' },
    ],
    //   'fathername': [
    //   { type: 'required', message: ' Father Name is required' },
    // ],
    'dob': [
      { type: 'required', message: ' DOB is required' },
    ],
    // 'nicno': [
    //   { type: 'required', message: ' NIC No. is required' },
    // ],
    'religion': [
      { type: 'required', message: ' religion is required' },
    ],
    'qualification': [
      { type: 'required', message: ' Qualification is required' },
    ],
    'sex': [
      { type: 'required', message: ' Sex is required' },
    ],
    // 'city': [
    //   { type: 'required', message: ' City is required' },
    // ]
  };

  sexType = [
    { value: '1', view: 'Male' },
    { value: '2', view: 'Female' },
    { value: '3', view: 'Undefined' }
  ]
  religionType = [
    { value: '1', view: 'Islam' },
    { value: '2', view: 'christian' },
    { value: '3', view: 'Hindu' },
    { value: '4', view: 'Other' },
  ]
  constructor(public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private appService: AppService, private service: EmployeeService,
    private notification: NotificationService,
    private _EmployeeService: EmployeeService,
    ) {

    this.classObj = this.initObject();


    if (this.data == null) {

    }
    if (data != null) {

      this.classObj = data.obj;
      this.codeId=this.classObj.Code;
      this.title = this.classObj.Name;
      this.service = data.service;
      // console.log(this.service);        
    }
  }

  ngOnInit(): void {

    this.createForm();
   // this.getNewRecord()
    this.setFormValues(this.classObj);
  }

  createForm() {
    this.form1 = this.fb.group({
      code: [{ value: null, disabled: true }, [Validators.required, Validators.maxLength(2)]],
      name: ["", [Validators.required]],
      // fathername: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      // nicno: ["", [Validators.required]],
      religion: ["", [Validators.required]],
      qualification: ["", [Validators.required]],
      sex: ["", [Validators.required]],
      // city: ["", [Validators.required]],
      status: [false]
    });
  }

  setFormValues(obj: IEmployee) {

    this.form1.patchValue({
      code: obj.Code,
      name: obj.Name,
      // fathername: obj.FatherName,
      dob: obj.DOB,
      // nicno: obj.NICNo,
      religion: obj.Religion,
      qualification: obj.Qualification,
      sex: obj.Sex,
      // city: obj.City,
      status: obj.Status,
    });
  }

  initObject() {
    {
      var obj = {} as IEmployee;
      //default values      

      return obj;
    }
  }
 
  private getValuesIntoObject() {

    debugger;
    this.classObj.Code = this.form1.get('code').value;

    this.classObj.Name = this.form1.get('name').value;
    // this.classObj.FatherName = this.form1.get('fathername').value;
    this.classObj.DOB = this.form1.get('dob').value;
    // this.classObj.NICNo = this.form1.get('nicno').value;
    this.classObj.Religion = this.form1.get('religion').value;
    this.classObj.Qualification = this.form1.get('qualification').value;
    this.classObj.Sex = this.form1.get('sex').value;
    // this.classObj.City=this.form1.get('city').value;
    this.classObj.Status = this.form1.get('status').value;

  }
codeId:string;


getNewRecord(){
    this._EmployeeService.getNewEmployees().subscribe(result=>{
        console.log(result);
        this.codeId=result.Code;
        this.OnSubmit(this.codeId,Image);
        
        
    });
              
  }

  saveRecord() {

    debugger;
    this.getValuesIntoObject();
    console.log(this.classObj);
    this.service.updateRecord(this.classObj)
      .subscribe(data => {  
        if (data == true) {
          
          if(this.codeId==null || this.codeId==undefined){
            this.getNewRecord();
          }
          else{
            this.OnSubmit(this.codeId,Image);
          }
          //this.data.isOK = true;
         // this.OnSubmit(this.codeId,Image);
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



  // Image upload


  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(code,Image) {
    debugger;
    this._EmployeeService.postFile(code,this.fileToUpload)
    .subscribe(data => {
      if (data == true){
        console.log('done');
        Image.value = null;
        code.Value=null;
        this.imageUrl = "/assets/img/default-image.png";
        this.downloadImage();
        
      }
      else {
        console.log('Problem while saving the Image');



      }

      }
    );

    
  }


  downloadImage() {
    
     this._EmployeeService.getEmpPhoto(this.codeId)
       .subscribe(data => {
         debugger;
         this.showImageFromBytes(data);
       },
         err => {
           console.log('error while dowloading image')
           // this.imagePath = this.downloadingErrorPath;
          // this.snackBar.open('Error', 'Problem while downloading the file', { duration: 4000 });
         }
       );
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





}
