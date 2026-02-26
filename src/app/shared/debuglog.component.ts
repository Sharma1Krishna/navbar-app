import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating toggle button (always visible) -->
    <button class="debug-toggle" (click)="isOpen = !isOpen" [class.active]="isOpen">
      <span class="debug-toggle__icon">⚡</span>
      <span class="debug-toggle__label">Logs</span>
      <span class="debug-toggle__count" *ngIf="logs.length > 0">{{ logs.length }}</span>
    </button>

    <!-- Log panel (slides up when open) -->
    <div class="debug-panel" [class.debug-panel--open]="isOpen">
      <div class="debug-panel__header">
        <span class="debug-panel__title">Event Logs</span>
        <div class="debug-panel__actions">
          <button class="debug-panel__clear" (click)="onClear()">Clear</button>
          <button class="debug-panel__close" (click)="isOpen = false">✕</button>
        </div>
      </div>
      <ul class="debug-panel__list">
        <li *ngFor="let log of logs" class="debug-panel__item"
          [class.debug-panel__item--blocked]="log.includes('BLOCKED')">
          {{ log }}
        </li>
        <li *ngIf="logs.length === 0" class="debug-panel__empty">No logs yet</li>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    /* ── Toggle Button ── */
    .debug-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      background: #0f0f0f;
      color: #e0e0e0;
      border: 1px solid #333;
      border-radius: 999px;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: background 0.2s, box-shadow 0.2s;
    }

    .debug-toggle:hover,
    .debug-toggle.active {
      background: #1a1a1a;
      box-shadow: 0 4px 24px rgba(0,0,0,0.6);
    }

    .debug-toggle__icon {
      font-size: 14px;
    }

    .debug-toggle__count {
      background: #f59e0b;
      color: #000;
      font-size: 10px;
      font-weight: 700;
      border-radius: 999px;
      padding: 1px 6px;
      min-width: 18px;
      text-align: center;
    }

    /* ── Log Panel ── */
    .debug-panel {
      position: absolute;
      bottom: 2px;
      right: 20dvw;
      width: 60dvw;
      max-height: 30dvh;
      background: #0f0f0f;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.6);
      overflow: hidden;
      display: flex;
      flex-direction: column;

      /* Hidden state */
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .debug-panel--open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    .debug-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid #1e1e1e;
      flex-shrink: 0;
    }

    .debug-panel__title {
      color: #888;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .debug-panel__actions {
      display: flex;
      gap: 8px;
    }

    .debug-panel__clear,
    .debug-panel__close {
      background: transparent;
      border: 1px solid #2a2a2a;
      color: #666;
      border-radius: 6px;
      padding: 3px 10px;
      font-size: 11px;
      font-family: inherit;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
    }

    .debug-panel__clear:hover {
      color: #f59e0b;
      border-color: #f59e0b44;
    }

    .debug-panel__close:hover {
      color: #ef4444;
      border-color: #ef444444;
    }

    .debug-panel__list {
      list-style: none;
      margin: 0;
      padding: 8px 0;
      overflow-y: auto;
      flex: 1;
    }

    .debug-panel__list::-webkit-scrollbar {
      width: 4px;
    }

    .debug-panel__list::-webkit-scrollbar-track {
      background: transparent;
    }

    .debug-panel__list::-webkit-scrollbar-thumb {
      background: #2a2a2a;
      border-radius: 999px;
    }

    .debug-panel__item {
      padding: 5px 14px;
      font-size: 11px;
      color: #7dd3fc;
      line-height: 1.5;
      border-bottom: 1px solid #111;
    }

    .debug-panel__item--blocked {
      color: #f87171;
    }

    .debug-panel__empty {
      padding: 20px 14px;
      font-size: 11px;
      color: #333;
      text-align: center;
    }
  `]
})
export class DebugLogComponent {
  @Input() logs: string[] = [];
  @Output() clearLogs = new EventEmitter<void>();

  isOpen = false;

  onClear() {
    this.clearLogs.emit();
  }
}
