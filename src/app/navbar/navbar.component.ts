
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { AppLinkComponent } from '../shared/app-link.component';
import { filter } from 'rxjs';
import { menuItems } from './menu';
import { DebugLogComponent } from '../shared/debuglog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AppLinkComponent, DebugLogComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  static logId = 0
  activeIndex: number | null = -1;
  activeMenu: string | null = null;
  private closeTimeout: any;
  isDrawerOpen = false;
  // Structured menu data used by the template
  menuItems = menuItems
  constructor(private router: Router) { }


  // 1. Array to hold our on-screen logs
  uiLogs: string[] = [];

  private navigationEndTime = 0;
  private readonly POST_NAV_BLOCK = 800; // ms to block after NavigationEnd

  isTouchDevice = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.isTouchDevice) return; // ✅ skip on desktop
        this.navigationEndTime = Date.now();
        if (typeof document !== 'undefined') {
          document.body.classList.add('navigating-lock');
        }
      }

      if (event instanceof NavigationEnd) {
        if (!this.isTouchDevice) return; // ✅ skip on desktop
        this.activeIndex = -1;
        this.activeMenu = null;
        this.navigationEndTime = Date.now();

        if (typeof document !== 'undefined') {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.body.classList.remove('navigating-lock');
            });
          });
        }
      }
    });
  }

  reset() {
    this.addLog('reset called');
    if (this.isTouchDevice) {
      this.navigationEndTime = Date.now(); // ✅ skip on desktop
    }
    this.isDrawerOpen = false;
    this.activeIndex = -1;
    this.activeMenu = null;
  }

  onMouseEnter(menuName: string, index: number) {
    if (this.isTouchDevice && Date.now() - this.navigationEndTime < this.POST_NAV_BLOCK) {
      this.addLog(`BLOCKED post-nav mouseenter: ${menuName}`);
      return; // ✅ only block on touch devices
    }

    this.addLog(`mouseenter: ${menuName}`);
    this.activeMenu = menuName;
    this.activeIndex = index;
  }

  onMouseLeave(menuName?: string) {
    if (this.isTouchDevice && Date.now() - this.navigationEndTime < this.POST_NAV_BLOCK) {
      return; // ✅ only block on touch devices
    }

    const name = menuName ?? this.activeMenu ?? 'unknown';
    this.addLog(`mouseleave: ${name}`);
    this.activeIndex = -1;
    this.activeMenu = null;
  }
  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  // 3. Helper function to format logs and keep the array from getting too big
  addLog(message: string) {
    const time = new Date().toLocaleTimeString();
    // Use unshift to put the newest log at the top of the list
    this.uiLogs.unshift(`${NavbarComponent.logId++}. ${message}  [${time}]`);

    // Keep only the last 20 logs so it doesn't eat up iPad memory
    if (this.uiLogs.length > 20) {
      this.uiLogs.pop();
    }
  }
  // Add this new method below your addLog() method
  clearLogs() {
    this.uiLogs = [];
  }
}