import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  template: `
    <a href="#" (click)="navigate($event)" [class]="linkClass"><ng-content></ng-content></a>
  `
})
export class AppLinkComponent {
  @Input() path = '';
  @Input() linkClass = '';

  constructor(private router: Router) {}

  navigate(event: MouseEvent) {
    event.preventDefault();
    if (!this.path) return;
    this.router.navigate([this.path]);
  }
}
