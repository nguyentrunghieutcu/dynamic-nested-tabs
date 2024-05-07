import { Component, HostListener } from '@angular/core';
import { VERSION } from '@angular/material';
import { NavItem } from './nav-item';
// import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tabs: string[];
  visibleTabs: string[];
  moreTabs: string[];
  selectedTab: number;
  index: number = 0;

  constructor() {
    this.tabs = [
      'Home',
      'Profile',
      'Messages',
      'Settings',
      'Campaign',
      'Dashboard',
      'Notifications',
    ];
    this.visibleTabs = [];
    this.moreTabs = [];
    this.selectedTab = 0;
  }

  indexSelected(event) {
    this.index = event;
  }
}
