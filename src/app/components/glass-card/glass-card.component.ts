import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glass-card.component.html',
  styleUrl: './glass-card.component.scss'
})
export class GlassCardComponent {
  @Input() compact: boolean = false;
  @Input() elevated: boolean = false;
  @Input() animate: boolean = false;
  @Input() animationDelay: 1 | 2 | 3 | 4 | 5 | null = null;
  @Input() hoverEffect: boolean = true;
  @Input() glow: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | null = null;

  get cardClasses(): string {
    const classes = [];
    
    if (this.elevated) {
      classes.push('glass-elevated');
    } else if (this.compact) {
      classes.push('glass-card-compact');
    } else {
      classes.push('glass-card');
    }

    if (this.animate) {
      classes.push('glass-animate');
      if (this.animationDelay) {
        classes.push(`glass-animate-${this.animationDelay}`);
      }
    }

    if (this.glow) {
      classes.push(`glass-glow-${this.glow}`);
    }

    return classes.join(' ');
  }
}
