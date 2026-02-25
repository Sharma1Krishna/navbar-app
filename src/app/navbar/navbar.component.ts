import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  activeMenu: string | null = null; 
  private closeTimeout: any;

  // 1. Array to hold our on-screen logs
  uiLogs: string[] = [];

  onMouseEnter(menuName: string) {
    // 2. Log the event to the UI
    this.addLog(`mouseenter: ${menuName}`);

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.activeMenu = menuName;
  }

  onMouseLeave() {
    this.addLog(`mouseleave triggered`); // Optional: log this too so you can see the cycle!

    this.closeTimeout = setTimeout(() => {
      this.activeMenu = null;
    }, 200);
  }

  // 3. Helper function to format logs and keep the array from getting too big
  addLog(message: string) {
    const time = new Date().toLocaleTimeString();
    // Use unshift to put the newest log at the top of the list
    this.uiLogs.unshift(`[${time}] ${message}`); 
    
    // Keep only the last 20 logs so it doesn't eat up iPad memory
    if (this.uiLogs.length > 20) {
      this.uiLogs.pop();
    }
  }
}