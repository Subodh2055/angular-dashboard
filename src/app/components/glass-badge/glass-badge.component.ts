import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host { display: inline-block; }
  `]
})
export class GlassBadgeComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  @Input() pill: boolean = false;

  get badgeClasses(): string {
    const classes = [`glass-badge glass-badge-${this.variant}`];
    if (this.pill) classes.push('glass-rounded-full');
    return classes.join(' ');
  }
}
