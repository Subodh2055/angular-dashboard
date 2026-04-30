import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatListModule],
  template: `
    <div class="glass-right-panel shadow-lg" [class.open]="sharedService.isRightPanelOpen$ | async">
      <div class="panel-header p-4 d-flex justify-content-between align-items-center border-bottom border-light border-opacity-10">
        <h5 class="mb-0 glass-h5 d-flex align-items-center">
          <mat-icon class="me-2 text-primary">settings_suggest</mat-icon>
          Control Center
        </h5>
        <button class="action-btn glass-btn-ghost rounded-circle" (click)="sharedService.toggleRightPanel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="sidebar-scroll">
        <mat-accordion multi="true" class="glass-accordion">
          
          <!-- Profile Section (Expandable) -->
          <mat-expansion-panel class="glass-expansion-panel border-bottom border-light border-opacity-10" [expanded]="true">
            <mat-expansion-panel-header>
              <mat-panel-title class="d-flex align-items-center fw-bold">
                <mat-icon class="me-2 text-primary">account_circle</mat-icon>
                User Profile
              </mat-panel-title>
            </mat-expansion-panel-header>
            
            <div class="p-3 text-center">
              <div class="avatar-large mb-3 mx-auto">
                <img src="https://ui-avatars.com/api/?name=Subodh+Bhandari&background=0066FF&color=fff&size=128&bold=true" class="rounded-circle shadow-sm" width="80">
              </div>
              <h6 class="mb-0 fw-bold">Subodh Bhandari</h6>
              <p class="text-muted small mb-3">System Administrator</p>
              <div class="d-grid gap-2">
                <button class="glass-btn glass-btn-primary glass-text-xs py-2">View Profile</button>
                <button class="glass-btn glass-btn-ghost glass-text-xs py-2 text-danger">Sign Out</button>
              </div>
            </div>
          </mat-expansion-panel>

          <!-- System Updates (Expandable) -->
          <mat-expansion-panel class="glass-expansion-panel border-bottom border-light border-opacity-10">
            <mat-expansion-panel-header>
              <mat-panel-title class="d-flex align-items-center fw-bold">
                <mat-icon class="me-2 text-warning">system_update</mat-icon>
                System Updates
              </mat-panel-title>
            </mat-expansion-panel-header>
            
            <mat-nav-list class="px-2">
              <a mat-list-item class="rounded mb-2">
                <mat-icon matListItemIcon class="text-success">check_circle</mat-icon>
                <span matListItemTitle class="fw-bold glass-text-sm">V2.4 Security Patch</span>
                <span matListItemLine class="glass-text-xs text-muted">Applied 2 hours ago</span>
              </a>
              <a mat-list-item class="rounded mb-2">
                <mat-icon matListItemIcon class="text-info">info</mat-icon>
                <span matListItemTitle class="fw-bold glass-text-sm">Database Maintenance</span>
                <span matListItemLine class="glass-text-xs text-muted">Scheduled for 12:00 PM</span>
              </a>
            </mat-nav-list>
          </mat-expansion-panel>

          <!-- System Performance -->
          <mat-expansion-panel class="glass-expansion-panel">
            <mat-expansion-panel-header>
              <mat-panel-title class="d-flex align-items-center fw-bold">
                <mat-icon class="me-2 text-info">speed</mat-icon>
                Performance
              </mat-panel-title>
            </mat-expansion-panel-header>
            
            <div class="p-3">
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                  <span class="glass-text-xs">CPU Usage</span>
                  <span class="glass-text-xs fw-bold">24%</span>
                </div>
                <div class="progress" style="height: 4px;">
                  <div class="progress-bar bg-success" style="width: 24%"></div>
                </div>
              </div>
              <div>
                <div class="d-flex justify-content-between mb-1">
                  <span class="glass-text-xs">Memory Usage</span>
                  <span class="glass-text-xs fw-bold">68%</span>
                </div>
                <div class="progress" style="height: 4px;">
                  <div class="progress-bar bg-warning" style="width: 68%"></div>
                </div>
              </div>
            </div>
          </mat-expansion-panel>

        </mat-accordion>
      </div>
    </div>
    
    <!-- Overlay -->
    <div class="panel-overlay" 
         *ngIf="sharedService.isRightPanelOpen$ | async" 
         (click)="sharedService.toggleRightPanel()">
    </div>
  `,
  styles: [`
    .glass-right-panel {
      position: fixed;
      top: 0;
      right: -380px;
      width: 380px;
      height: 100vh;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(40px) saturate(180%);
      border-left: 1px solid rgba(0, 102, 255, 0.1);
      z-index: 1050;
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }
    .glass-right-panel.open { right: 0; }
    
    .sidebar-scroll { flex: 1; overflow-y: auto; }
    
    .panel-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(4px);
      z-index: 1040;
    }

    .glass-expansion-panel {
      background: transparent !important;
      box-shadow: none !important;
    }
    
    ::ng-deep .mat-expansion-panel-header {
      height: 64px !important;
    }
    
    .avatar-large {
      width: 80px;
      height: 80px;
      padding: 4px;
      background: linear-gradient(135deg, var(--glass-primary), var(--glass-secondary));
      border-radius: 50%;
    }
    
    .action-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      transition: all 0.2s ease;
    }
    .action-btn:hover { background: rgba(230, 46, 77, 0.1); color: var(--glass-error); }
  `]
})
export class RightPanelComponent {
  constructor(public sharedService: SharedService) {}
}
