export interface IPayDepartment {
    Code: string;
    Name: string;
    Description: string;
    Status: string;
    IsSync : boolean;
    RowState: string;
    AddOn: Date
    AddBy: string;
    EditOn: Date;
    EditBy: string
    SyncDate: Date;
   CompanyID: number;
    IsDirty: boolean;
    ImageName: string;
  }
  