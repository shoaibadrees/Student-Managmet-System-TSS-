import { OrdersComponent } from './../../orders/orders.component';
import { NotificationsComponent } from './../../notifications/notifications.component';



import { LeavesComponent } from './../../Leaves/leaves.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';

import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DesignationComponent } from 'app/designation/designation.component';
import { DesignationSecurityComponent } from 'app/designation/designation-security/designation-security.component';
import { DepartmentsComponent } from 'app/departments/departments.component';
import { ShiftsComponent } from 'app/Shifts/shifts.component';
import { AdvanceComponent } from 'app/Advance/advance.component';
import { ClassesComponent } from 'app/Classes/Classes.component';
import { SectionsComponent } from './../../Sections/Sections.component';
import { StatusesComponent } from 'app/Statuses/Statuses.component';
import { ParentsInfoComponent } from './../../ParentsInfo/ParentsInfo.component';
import { VaccinationsComponent } from 'app/Vaccinations/Vaccinations.component';
import { StudentsComponent } from 'app/Student/Students.component';
import { StudentsListComponent } from 'app/Student/StudentsList.component';
import { AdmissionHistoryDialogComponent } from 'app/Student/AdmissionHistory/AddmissionHistory_Dialog.component';
import { spStudentParentInfosComponent } from 'app/Student/spStudentParentInfos/spStudentParentInfos.component';
import { EmployeeComponent } from 'app/employee/employee.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    
  { path: 'dashboard', component: DashboardComponent },
  { path: 'desig', component: DesignationComponent },
  { path: 'Classes',     component: ClassesComponent },
  { path: 'Sections',     component: SectionsComponent },
  { path: 'Statuses', component: StatusesComponent},
  { path: 'ParentsInfo', component: ParentsInfoComponent },
  { path: 'Vaccinations', component: VaccinationsComponent },
  { path: 'departments',     component: DepartmentsComponent },
  { path: 'employees',     component: EmployeeComponent },
  { path: 'Shifts',     component: ShiftsComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'PayDesignation/no',component: DesignationSecurityComponent },
    { path: 'leaves',component: LeavesComponent },
    { path: 'advance',component: AdvanceComponent },
     {path: 'Students',component: StudentsComponent},
     { path: 'StudentList',     component: StudentsListComponent },
     { path: 'UpdateStudents/:id',component: StudentsComponent},
     { path: 'AdmissionHistory',component: AdmissionHistoryDialogComponent},
     { path: 'Orders',component: OrdersComponent},
   //  { path: 'diaref/:id',component: spStudentParentInfosComponent},
];



