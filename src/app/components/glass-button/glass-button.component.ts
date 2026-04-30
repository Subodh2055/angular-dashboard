import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glass-button.component.html',
  styleUrl: './glass-button.component.scss'
})
export class GlassButtonComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() block: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconOnly: boolean = false;
  @Input() animate: boolean = false;
  @Input() animationDelay: 1 | 2 | 3 | 4 | 5 | null = null;

  @Output() btnClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['glass-btn'];

    if (this.variant !== 'primary') {
      classes.push(`glass-btn-${this.variant}`);
    }

    if (this.size !== 'md') {
      classes.push(`glass-btn-${this.size}`);
    }

    if (this.block) {
      classes.push('glass-btn-block');
    }

    if (this.iconOnly) {
      classes.push('glass-btn-icon');
    }

    if (this.animate) {
      classes.push('glass-animate');
      if (this.animationDelay) {
        classes.push(`glass-animate-${this.animationDelay}`);
      }
    }

    return classes.join(' ');
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
