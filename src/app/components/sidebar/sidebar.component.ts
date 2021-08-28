import { Component, OnInit } from '@angular/core';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/StudentList', title: 'Students List', icon: 'person', class: '' },
    { path: '/Students', title: 'User Profile', icon: 'person', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
    { path: '/Classes', title: 'Classes',  icon: 'dashboard', class: '' },
    { path: '/Sections', title: 'Sections',  icon: 'dashboard', class: '' },
    { path: '/Statuses', title: 'Statuses',  icon: 'dashboard', class: '' },
    { path: '/ParentsInfo', title: 'ParentsInfo',  icon: 'dashboard', class: '' },
    { path: '/Vaccinations', title: 'Vaccinations',  icon: 'dashboard', class: '' },,
    { path: '/desig', title: 'Designations', icon: 'person', class: '' },
    { path: '/departments', title: 'Departments', icon: 'library_books', class: '' },
    { path: '/employees', title: 'Employees', icon: 'person', class: '' },
    { path: '/advance', title: 'Advance', icon: 'library_books', class: '' },
    { path: '/Shifts', title: 'Shifts',  icon:'content_paste', class: '' },
    { path: '/leaves', title: 'leaves',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/Orders', title: 'Orders',  icon:'fastfood', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
