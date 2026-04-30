import { Component, Input, forwardRef, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface GlassSelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-glass-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlassSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="glass-form-group position-relative" [class.disabled]="disabled">
      <label *ngIf="label" class="glass-label">{{ label }}</label>
      
      <!-- Select Trigger / Input Area -->
      <div 
        class="glass-select-trigger" 
        [class.open]="isOpen" 
        [class.has-value]="hasValue"
        (click)="toggleDropdown()"
      >
        <div class="d-flex flex-wrap gap-1 flex-grow-1 overflow-hidden">
          <ng-container *ngIf="multiple && Array.isArray(value) && value.length > 0; else singleValueTpl">
            <span *ngFor="let val of value" class="glass-badge glass-badge-primary glass-text-xs py-0 px-2">
              {{ getOptionLabel(val) }}
              <i class="bi bi-x ms-1 cursor-pointer" (click)="$event.stopPropagation(); removeValue(val)"></i>
            </span>
          </ng-container>
          <ng-template #singleValueTpl>
            <span *ngIf="hasValue" class="glass-text-sm">{{ getOptionLabel(value) }}</span>
            <span *ngIf="!hasValue" class="glass-text-muted glass-text-sm">{{ placeholder }}</span>
          </ng-template>
        </div>
        <i class="bi bi-chevron-down ms-2 transition-transform" [class.rotate-180]="isOpen"></i>
      </div>

      <!-- Dropdown Menu -->
      <div *ngIf="isOpen" class="glass-dropdown-menu-custom glass-animate glass-animate-scale w-100">
        <div class="p-2 border-bottom border-light-subtle" *ngIf="showSearch">
          <input 
            type="text" 
            class="glass-input glass-input-sm py-1" 
            placeholder="Search..." 
            [(ngModel)]="searchText"
            (click)="$event.stopPropagation()"
          />
        </div>
        <div class="glass-scroll max-h-60 overflow-y-auto p-1">
          <div 
            *ngFor="let opt of filteredOptions" 
            class="glass-select-option" 
            [class.selected]="isSelected(opt.value)"
            (click)="selectOption(opt)"
          >
            <span class="flex-grow-1">{{ opt.label }}</span>
            <i *ngIf="isSelected(opt.value)" class="bi bi-check-lg glass-text-primary"></i>
          </div>
          <div *ngIf="filteredOptions.length === 0" class="p-3 text-center text-muted glass-text-xs">
            No results found
          </div>
        </div>
      </div>

      <p *ngIf="hint" class="glass-form-hint">{{ hint }}</p>
      <p *ngIf="error" class="glass-form-error">{{ error }}</p>
    </div>
  `,
  styles: [`
    .glass-select-trigger {
      display: flex;
      align-items: center;
      min-height: 44px;
      padding: 0.5rem 1rem;
      background: var(--glass-surface);
      border: 1px solid rgba(0, 102, 255, 0.10);
      border-radius: calc(var(--glass-radius) * 0.6);
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    .glass-select-trigger:hover {
      border-color: rgba(0, 102, 255, 0.25);
      background: rgba(255, 255, 255, 0.95);
    }
    .glass-select-trigger.open {
      border-color: var(--glass-primary);
      box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.10);
    }
    .glass-dropdown-menu-custom {
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 102, 255, 0.12);
      border-radius: var(--glass-radius);
      box-shadow: 0 12px 48px rgba(0, 102, 255, 0.15);
    }
    .glass-select-option {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.25rem;
      font-size: 0.875rem;
      border-radius: calc(var(--glass-radius) * 0.4);
      cursor: pointer;
      transition: all 0.15s ease;
      color: var(--glass-text-secondary);
      margin: 2px 4px;
    }
    .glass-select-option:hover {
      background: rgba(0, 102, 255, 0.04);
      color: var(--glass-text);
    }
    .glass-select-option.selected {
      background: linear-gradient(90deg, rgba(0, 102, 255, 0.10), rgba(107, 44, 255, 0.05));
      color: var(--glass-primary);
      font-weight: 600;
    }
    .rotate-180 { transform: rotate(180deg); }
    .max-h-60 { max-height: 240px; }
    .transition-transform { transition: transform 0.2s ease; }
    .disabled { opacity: 0.6; pointer-events: none; }
    .glass-input-sm { font-size: 0.75rem; }
  `]
})
export class GlassSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select...';
  @Input() options: GlassSelectOption[] = [];
  @Input() multiple: boolean = false;
  @Input() showSearch: boolean = true;
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() disabled: boolean = false;

  value: any = null;
  isOpen = false;
  searchText = '';
  Array = Array; // For template access

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  
  onChange: any = () => {};
  onTouched: any = () => {};

  get hasValue(): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.length > 0;
    }
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  get filteredOptions(): GlassSelectOption[] {
    if (!this.searchText) return this.options;
    return this.options.filter(opt => 
      opt.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

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

  toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.searchText = '';
  }

  selectOption(option: GlassSelectOption) {
    if (this.multiple) {
      if (!Array.isArray(this.value)) this.value = [];
      const index = this.value.indexOf(option.value);
      if (index > -1) {
        this.value = this.value.filter((v: any) => v !== option.value);
      } else {
        this.value = [...this.value, option.value];
      }
    } else {
      this.value = option.value;
      this.isOpen = false;
    }
    this.onChange(this.value);
    this.onTouched();
  }

  isSelected(val: any): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(val);
    }
    return this.value === val;
  }

  removeValue(val: any) {
    if (this.multiple && Array.isArray(this.value)) {
      this.value = this.value.filter((v: any) => v !== val);
      this.onChange(this.value);
    }
  }

  getOptionLabel(val: any): string {
    const opt = this.options.find(o => o.value === val);
    return opt ? opt.label : val;
  }
}
