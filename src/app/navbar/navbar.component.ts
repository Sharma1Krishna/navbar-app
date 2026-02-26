
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

  ngOnInit() {
    this.router.events.pipe().subscribe((event) => {
     // 1. Lock the screen the exact millisecond routing starts
        if (event instanceof NavigationStart) {
          if (typeof document !== 'undefined') {
            document.body.classList.add('navigating-lock');
          }
        }

        // 2. Unlock synced with the browser paint (NO TIMEOUT)
        if (event instanceof NavigationEnd) {
          this.activeIndex = null; 
          
          if (typeof document !== 'undefined') {
            
            // Force iPad to drop its invisible hover state
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }

            // Wait exactly 1 frame for the browser to draw the new page
            requestAnimationFrame(() => {
              // Wait exactly 1 more frame for WebKit to clear the ghost click
              requestAnimationFrame(() => {
                document.body.classList.remove('navigating-lock');
              });
            }); 
            
          }
        }
    })
  }
  // 1. Array to hold our on-screen logs
  uiLogs: string[] = [];
  reset() {
    this.addLog("claaing reset")
    this.isDrawerOpen = false;
    // this.activeMenu = null;
    this.activeIndex = -1
  }
  onMouseEnter(menuName: string) {
    // 2. Log the event to the UI
    this.addLog(`mouseenter: ${menuName}`);

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.activeMenu = menuName;
  }

  onMouseLeave(menuName?: string) {
    const name = menuName ?? this.activeMenu ?? 'unknown';
    this.addLog(`mouseleave: ${name}`);

    // this.closeTimeout = setTimeout(() => {
    //   if (name === 'unknown') {
    //     this.activeMenu = null;
    //   } else if (this.activeMenu === name) {
    //     this.activeMenu = null;
    //   }
    // }, 200);
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
    this.uiLogs.push(`${message}  [${time}]`);

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