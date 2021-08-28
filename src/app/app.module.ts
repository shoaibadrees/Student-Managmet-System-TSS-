
import { NotificationsComponent } from './notifications/notifications.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';

import { UpgradeComponent } from './upgrade/upgrade.component';
import { AppService } from './shared/services/app.service';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DesignationComponent } from './designation/designation.component';
import { DesignationDialogComponent } from './designation/designation-dialog/designation-dialog.component';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';

import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { DesignationSecurityComponent } from './designation/designation-security/designation-security.component';
import { MatTableModule } from '@angular/material/table';
import { DemoMaterialModule } from './material-module';
import { NotificationService } from './Services/notification.service';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentDialogComponent } from './departments/Department_Dialog/department-dialog.component';

import { ShiftDialogComponent } from './Shifts/Shifts_Dialog/shift-dialog.component';
import { AdvanceDialogComponent } from './Advance/Advance_Dialog/advance-dialog.component';
import { AdvanceComponent } from './Advance/advance.component';
import { LeavesDialogComponent } from './Leaves/leaves_Dialog/leaves-dialog.component';
import { LeavesComponent } from './Leaves/leaves.component';
import { ClassesComponent } from './Classes/Classes.component';
import { ClassesDialogComponent } from './Classes/Classes_Dialog/Classes-dialog.component';
import { SectionsComponent } from './Sections/Sections.component';
import { SectionsDialogComponent } from './Sections/Sections_Dialog/Sections-dialog.component';
import { StatusesComponent } from './Statuses/Statuses.component';
import { StatusesDialogComponent } from './Statuses/Statuses_Dialog/Statuses-dialog.component';
import { ParentsInfoComponent } from './ParentsInfo/ParentsInfo.component';
import { ParentsInfoDialogComponent } from './ParentsInfo/ParentsInfo_Dialog/ParentsInfo-dialog.component';
import { VaccinationsComponent } from './Vaccinations/Vaccinations.component';
import { VaccinationsDialogComponent } from './Vaccinations/Vaccinations_Dialog/Vaccinations-dialog.component';
import { StudentsComponent } from './Student/Students.component';
import { StudentsListComponent } from './Student/StudentsList.component';
import { HealthInfoDialogComponent } from './Student/HealthInfo/HealthInfo_Dialog.component';

import { FeeHistoryDialogComponent } from './Student/FeeHistory/FeeHistory_Dialog.component';
import { AdmissionHistoryDialogComponent } from './Student/AdmissionHistory/AddmissionHistory_Dialog.component';
import { spStudentParentInfosComponent } from './Student/spStudentParentInfos/spStudentParentInfos.component';
import { KinshipComponent } from './Student/Kinship/Kinship.component';
import { AcademicHistoryComponent } from './Student/AcademicHistory/AcademicHistory.component';
import { AcademicHistoryDialogComponent } from './Student/AcademicHistory/AcademicHistory_Dialog/AcademicHistory-dialog.component';
import { OrdersComponent } from './orders/orders.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDialogComponent } from './employee/employee-dialog/employee-dialog.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatCardModule,
    
    MatTableModule,
    DemoMaterialModule
 


    /*AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
    */
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DesignationDialogComponent,
    DesignationComponent,
    MessageDialogComponent,
    DesignationSecurityComponent,
    DepartmentsComponent,
    DepartmentDialogComponent,
    ShiftDialogComponent,
    AdvanceComponent,
    AdvanceDialogComponent,
  LeavesComponent,
LeavesDialogComponent,
ClassesComponent, 
ClassesDialogComponent, 
SectionsComponent,
SectionsDialogComponent,
StatusesComponent,
StatusesDialogComponent,
ParentsInfoComponent,
ParentsInfoDialogComponent,
VaccinationsComponent,
VaccinationsDialogComponent,
StudentsComponent,
StudentsListComponent,
HealthInfoDialogComponent,
AcademicHistoryComponent,
AcademicHistoryDialogComponent,
FeeHistoryDialogComponent,
AdmissionHistoryDialogComponent,
spStudentParentInfosComponent,
KinshipComponent,
OrdersComponent,
EmployeeComponent,
EmployeeDialogComponent

  ],

  entryComponents:[MessageDialogComponent,DesignationDialogComponent,DepartmentDialogComponent],
  providers: [AppService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue : {hasBackdrop: true}},NotificationService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
