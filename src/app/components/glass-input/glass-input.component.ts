import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-glass-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlassInputComponent),
      multi: true
    }
  ],
  template: `
    <div class="glass-form-group">
      <label *ngIf="label" class="glass-label">{{ label }}</label>
      <div class="position-relative">
        <input
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          class="glass-input"
          [class.glass-rounded-full]="rounded"
          [class.glass-input-error]="hasError"
          [(ngModel)]="value"
          (input)="onInputChange($event)"
          (blur)="onBlur()"
        />
        <span *ngIf="icon" class="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
          <i [class]="icon"></i>
        </span>
      </div>
      <p *ngIf="hint" class="glass-form-hint">{{ hint }}</p>
      <p *ngIf="error" class="glass-form-error">{{ error }}</p>
    </div>
  `,
  styles: [`
    .glass-input.glass-rounded-full { padding-left: 3rem !important; }
    .glass-input-error { border-color: #E62E4D !important; box-shadow: 0 0 0 4px rgba(230, 46, 77, 0.1) !important; }
  `]
})
export class GlassInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() hasError: boolean = false;
  @Input() icon: string = '';
  @Input() rounded: boolean = false;
  @Input() disabled: boolean = false;

  value: string = '';
  
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
