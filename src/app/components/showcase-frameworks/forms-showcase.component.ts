import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { GlassCardComponent } from '../glass-card/glass-card.component';
import { GlassInputComponent } from '../glass-input/glass-input.component';
import { GlassSelectComponent } from '../glass-select/glass-select.component';
import { GlassButtonComponent } from '../glass-button/glass-button.component';

@Component({
  selector: 'app-forms-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    GlassCardComponent, 
    GlassInputComponent, 
    GlassSelectComponent,
    GlassButtonComponent
  ],
  template: `
    <div class="glass-container py-5 glass-animate">
      <div class="mb-5 text-center">
        <h1 class="glass-h1 glass-gradient-text mb-2">Form Systems</h1>
        <p class="glass-text-lg glass-text-secondary">Advanced form controls with validation and glassmorphism styling.</p>
      </div>

      <div class="row g-4">
        <!-- Template-Driven Forms -->
        <div class="col-md-6">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Template-Driven Form</h2>
            <div class="space-y-4">
              <div class="glass-form-group">
                <label class="glass-label">Username</label>
                <app-glass-input [(ngModel)]="username" placeholder="Type username..."></app-glass-input>
              </div>
              <div class="glass-form-group">
                <label class="glass-label">Role</label>
                <app-glass-select [(ngModel)]="role" [options]="roles"></app-glass-select>
              </div>
              <div class="pt-3">
                <p class="glass-text-xs text-muted">Value: {{username}} | {{role}}</p>
              </div>
            </div>
          </app-glass-card>
        </div>

        <!-- Reactive Forms -->
        <div class="col-md-6">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Reactive Form (Validation)</h2>
            <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
              <div class="glass-form-group">
                <label class="glass-label">Email Address</label>
                <app-glass-input formControlName="email" placeholder="email@example.com" [hasError]="userForm.get('email')?.invalid && userForm.get('email')?.touched"></app-glass-input>
                <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" class="text-danger small mt-1">
                  Please enter a valid email.
                </div>
              </div>
              
              <div class="glass-form-group">
                <label class="glass-label">Password</label>
                <app-glass-input type="password" formControlName="password" placeholder="••••••••"></app-glass-input>
              </div>

              <div class="pt-3">
                <button class="glass-btn glass-btn-primary glass-btn-block" [disabled]="userForm.invalid">Submit Application</button>
              </div>
            </form>
          </app-glass-card>
        </div>
      </div>
    </div>
  `
})
export class FormsShowcaseComponent {
  // Template models
  username = '';
  role = 'admin';
  roles = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' }
  ];

  // Reactive form
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.userForm.valid) {
      alert('Form Submitted: ' + JSON.stringify(this.userForm.value));
    }
  }
}
