export interface IStudents
 {
  StudentID: number;
  Code: string;
  ClassID: number;
  SectionID: number;
  FirstName: string;
  LastName: string;
  GenderID: number;
  DateOfBirth: Date;
  PlaceOfBirth:string;
  FatherName: string;
  Nationality: string;
  ReligionID:number;
  Address1:string;
  Address2:string;
  CityID: number;
  PostalCode: string;
  ProvinceID: number;
  CountryID: number;
  TelephoneResidence: string;
  TelephoneEmergency:  string;
  Photograph:FileList;
  StatusID:  number;
  Comments:  string;
  isActive: boolean;
  CreatedOn: Date
  CreatedBy: string;
   ModifiedOn: Date;
   ModifiedBy: string;
   HomeLanguages: string;
   AdmissionClass: number;
   FeePlanID: number;
   TemplateID: number;
   
   
  }
  