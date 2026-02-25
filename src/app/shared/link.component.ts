import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a [attr.href]="path" [class]="linkClass" (click)="onClick($event)">
      <ng-content></ng-content>
    </a>
  `
})
export class LinkComponent {
  @Input() path = '/';
  @Input() linkClass = '';

  constructor(private router: Router) {}

  onClick(e: MouseEvent) {
    // Allow modifier keys and non-left clicks to open in new tab/browser default
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();
    this.router.navigateByUrl(this.path).catch(() => {});
  }
}
