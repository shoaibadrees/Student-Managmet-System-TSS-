export interface IPayDesignation {
  Code: string;
  Name: string;
  Description: string;
  SortOrder : number;
  IsSync : boolean;
  RowState: string;
  AddOn: Date
  AddBy: string;
  EditOn: Date;
  EditBy: string
  SyncDate: Date;
 CompanyID: number;
  IsDirty: boolean;
}
