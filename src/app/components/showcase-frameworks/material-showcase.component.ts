import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlassCardComponent } from '../glass-card/glass-card.component';

@Component({
  selector: 'app-material-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatChipsModule, 
    MatProgressBarModule,
    GlassCardComponent
  ],
  template: `
    <div class="glass-container py-5 glass-animate">
      <div class="mb-5 text-center">
        <h1 class="glass-h1 glass-gradient-text mb-2">Angular Material Library</h1>
        <p class="glass-text-lg glass-text-secondary">Enterprise-grade UI components following Google's Material Design.</p>
      </div>

      <div class="row g-4">
        <!-- Buttons & Icons -->
        <div class="col-md-6">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Buttons & Icons</h2>
            <div class="d-flex flex-wrap gap-3 mb-4">
              <button mat-button>Basic</button>
              <button mat-raised-button color="primary">Primary</button>
              <button mat-stroked-button color="accent">Stroked</button>
              <button mat-flat-button color="warn">Flat Warn</button>
            </div>
            <div class="d-flex flex-wrap gap-3">
              <button mat-icon-button><mat-icon>favorite</mat-icon></button>
              <button mat-fab color="primary"><mat-icon>add</mat-icon></button>
              <button mat-mini-fab color="accent"><mat-icon>share</mat-icon></button>
            </div>
          </app-glass-card>
        </div>

        <!-- Progress & Feedback -->
        <div class="col-md-6">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Progress & Status</h2>
            <div class="mb-4">
              <p class="mb-2 glass-text-xs">Indeterminate Progress</p>
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </div>
            <div>
              <p class="mb-2 glass-text-xs">Chips / Tags</p>
              <mat-chip-set>
                <mat-chip>Angular</mat-chip>
                <mat-chip>TypeScript</mat-chip>
                <mat-chip>Material</mat-chip>
              </mat-chip-set>
            </div>
          </app-glass-card>
        </div>

        <!-- Standard Material Cards -->
        <div class="col-12">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Native Material Cards</h2>
            <div class="row g-4">
              <div class="col-md-4">
                <mat-card class="shadow-sm border">
                  <mat-card-header>
                    <mat-card-title>Card Title</mat-card-title>
                    <mat-card-subtitle>Subtitle</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content class="py-3">
                    <p>Standard Angular Material card content with built-in styling.</p>
                  </mat-card-content>
                  <mat-card-actions>
                    <button mat-button>LIKE</button>
                    <button mat-button>SHARE</button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>
          </app-glass-card>
        </div>
      </div>
    </div>
  `
})
export class MaterialShowcaseComponent {}
