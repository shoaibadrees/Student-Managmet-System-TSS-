import { Time } from "@angular/common";

export interface IPayShifts {
    Code: string;
    Name: string;
    Start1: any;
    End1: any;
    Split: boolean;
    Start2: Time;
    End2: Time;
    Relaxation: number;
    Duration: number;
    NextDay : boolean;
    IsSync : boolean;
    RowState: string;
    AddOn: Date
    AddBy: string;
    EditOn: Date;
    EditBy: string
    SyncDate: Date;
    CompanyID: number;
    ShiftEndingAdjustmentHours: number;
    IsDirty: boolean;

  }




  