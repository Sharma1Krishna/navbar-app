
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { AppLinkComponent } from '../shared/app-link.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AppLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  static logId =0
  activeIndex: number | null = -1;
  activeMenu: string | null = null;
  private closeTimeout: any;
  isDrawerOpen = false;
  // Structured menu data used by the template
  menuItems = [
    { name: 'Home', path: '/home' },
    {
      name: 'Products',
      path: '/products',
      children: [
        { name: 'Software', path: '/software' },
        { name: 'Hardware', path: '/hardware' },
        { name: 'Accessories', path: '/accessories' }
      ]
    },
    {
      name: 'Solutions',
      path: '/solutions',
      children: [
        { name: 'Enterprise', path: '/enterprise' },
        { name: 'Small Business', path: '/small-business' },
        { name: 'Startups', path: '/startups' }
      ]
    },
    {
      name: 'Services',
      path: '/services',
      children: [
        { name: 'All Services', path: '/services' },
        { name: 'Consulting', path: '/consulting' },
        { name: 'Testimonials', path: '/testimonials' }
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    {
      name: 'About',
      path: '/about',
      children: [
        { name: 'Our Story', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Support Hub', path: '/support' }
      ]
    },
    {
      name: 'Resources',
      path: '/blog',
      children: [
        { name: 'Latest Articles', path: '/blog' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Webinars', path: '/webinars' }
      ]
    },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' }
  ];
  constructor(private router: Router) { }

 
  // 1. Array to hold our on-screen logs
  uiLogs: string[] = [];
reset() {
  this.addLog('reset called');
  this.navigationEndTime = Date.now(); // ✅ stamp immediately when user taps
  this.isDrawerOpen = false;
  this.activeIndex = -1;
  this.activeMenu = null;
}
private navigationEndTime = 0;
private readonly POST_NAV_BLOCK = 800; // ms to block after NavigationEnd

ngOnInit() {
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
      this.navigationEndTime = Date.now();
      if (typeof document !== 'undefined') {
        document.body.classList.add('navigating-lock');
      }
    }

    if (event instanceof NavigationEnd) {
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

onMouseEnter(menuName: string, index: number) {
  // ✅ Block for 800ms after NavigationEnd — ghost events land in this window
  if (Date.now() - this.navigationEndTime < this.POST_NAV_BLOCK) {
    this.addLog(`BLOCKED post-nav mouseenter: ${menuName}`);
    return;
  }

  this.addLog(`mouseenter: ${menuName}`);
  this.activeMenu = menuName;
  this.activeIndex = index;
}

onMouseLeave(menuName?: string) {
  if (Date.now() - this.navigationEndTime < this.POST_NAV_BLOCK) return;

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