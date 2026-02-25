import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() linkClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigate(event: MouseEvent) {
    this.linkClick.emit();
    event.preventDefault();
    if (!this.path) return;
    
    setTimeout(() => {
      this.router.navigate([this.path]);
    }, 2800);
  }
}
