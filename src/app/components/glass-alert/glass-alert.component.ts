import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" [class]="alertClasses">
      <div class="glass-toast-icon" *ngIf="icon">
        <i [class]="icon"></i>
      </div>
      <div class="glass-toast-content">
        <div class="glass-toast-title" *ngIf="title">{{ title }}</div>
        <div class="glass-toast-message">
          <ng-content></ng-content>
        </div>
      </div>
      <button class="glass-toast-close" (click)="close()" *ngIf="dismissible">
        <i class="bi bi-x"></i>
      </button>
    </div>
  `
})
export class GlassAlertComponent {
  @Input() variant: 'success' | 'warning' | 'error' | 'info' = 'info';
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() dismissible: boolean = true;
  @Input() show: boolean = true;

  get alertClasses(): string {
    return `glass-alert glass-alert-${this.variant} glass-animate`;
  }

  close(): void {
    this.show = false;
  }
}
