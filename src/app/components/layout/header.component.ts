import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatMenuModule, MatButtonModule, MatIconModule, MatBadgeModule, MatDividerModule],
  template: `
    <header class="glass-header">
      <div class="header-container d-flex align-items-center justify-content-between h-100 px-4">
        
        <!-- Left Side: Brand + Toggle -->
        <div class="header-left d-flex align-items-center gap-3">
          <button mat-icon-button (click)="sharedService.toggleSidebar()" class="glass-action-btn">
            <mat-icon>menu</mat-icon>
          </button>
          
          <div class="header-brand">
            <a routerLink="/" class="brand-link d-flex align-items-center text-decoration-none">
              <div class="logo-box me-2">
                <mat-icon class="glass-gradient-text fs-2">shield_check</mat-icon>
              </div>
              <span class="brand-text fw-bold glass-gradient-text fs-5 d-none d-sm-inline">NexBodh CMS</span>
            </a>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="header-actions d-flex align-items-center gap-1 gap-md-2">
          <!-- Quick Search (Desktop) -->
          <div class="search-box d-none d-md-flex align-items-center px-3 py-1 rounded-pill border border-light border-opacity-10 bg-white bg-opacity-10 me-2">
            <mat-icon class="text-muted me-2" style="font-size: 1.1rem; width: 1.1rem; height: 1.1rem;">search</mat-icon>
            <span class="text-muted small">Search...</span>
            <kbd class="ms-3 bg-dark bg-opacity-10 text-muted border-0 small">⌘K</kbd>
          </div>

          <!-- Notifications -->
          <button mat-icon-button [matMenuTriggerFor]="notifMenu" class="glass-action-btn">
            <mat-icon [matBadge]="3" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
          </button>
          <mat-menu #notifMenu="matMenu" class="glass-mat-menu" xPosition="before">
            <div class="px-3 py-2 d-flex justify-content-between align-items-center border-bottom border-light border-opacity-10">
              <span class="glass-text-xs glass-uppercase fw-bold text-muted">Notifications</span>
              <span class="badge bg-primary-subtle text-primary glass-text-xs">3 New</span>
            </div>
            <button mat-menu-item class="py-3 h-auto">
              <div class="d-flex align-items-center">
                <div class="icon-circle bg-primary-subtle text-primary me-3">
                  <mat-icon>person_add</mat-icon>
                </div>
                <div>
                  <p class="mb-0 glass-text-sm fw-bold text-dark">System Update</p>
                  <small class="text-muted">Security patch applied successfully.</small>
                </div>
              </div>
            </button>
            <div class="border-top border-light border-opacity-10 p-2">
              <button mat-button class="w-100 glass-text-xs text-primary fw-bold">View All Activity</button>
            </div>
          </mat-menu>

          <!-- Right Panel Toggle (Settings) -->
          <button mat-icon-button (click)="sharedService.toggleRightPanel()" class="glass-action-btn">
            <mat-icon>settings</mat-icon>
          </button>

          <!-- Vertical Divider -->
          <div class="vr mx-1 opacity-10" style="height: 24px;"></div>

          <!-- User Profile -->
          <button mat-button [matMenuTriggerFor]="profileMenu" class="profile-pill-btn">
            <div class="d-flex align-items-center gap-2">
              <div class="avatar-wrap">
                <img src="https://ui-avatars.com/api/?name=Subodh+Bhandari&background=0066FF&color=fff&bold=true" alt="User">
                <div class="status-indicator"></div>
              </div>
              <div class="profile-details d-none d-lg-block text-start">
                <p class="mb-0 glass-text-xs fw-bold lh-1 text-dark">Subodh Bhandari</p>
                <small class="text-muted fw-medium" style="font-size: 0.65rem;">Administrator</small>
              </div>
              <mat-icon class="glass-text-xs text-muted">expand_more</mat-icon>
            </div>
          </button>

          <mat-menu #profileMenu="matMenu" class="glass-mat-menu" xPosition="before">
            <div class="dropdown-header glass-text-xs text-muted glass-uppercase p-3 border-bottom border-light border-opacity-10">Account Settings</div>
            <button mat-menu-item>
              <mat-icon class="opacity-75">account_circle</mat-icon>
              <span>Profile Settings</span>
            </button>
            <button mat-menu-item>
              <mat-icon class="opacity-75">security</mat-icon>
              <span>Security</span>
            </button>
            <mat-divider class="opacity-10"></mat-divider>
            <button mat-menu-item class="text-danger">
              <mat-icon class="text-danger">logout</mat-icon>
              <span>Sign Out</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .glass-header {
      height: 70px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px) saturate(160%);
      border-bottom: 1px solid rgba(0, 102, 255, 0.08);
      position: sticky;
      top: 0;
      z-index: 1020;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
    }
    
    .brand-link:hover .logo-box {
      transform: rotate(-10deg) scale(1.1);
    }
    .logo-box { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .glass-action-btn {
      color: var(--glass-text-secondary) !important;
      transition: all 0.2s ease !important;
    }
    .glass-action-btn:hover {
      background: rgba(0, 102, 255, 0.05) !important;
      color: var(--glass-primary) !important;
    }

    .profile-pill-btn {
      padding: 4px 8px 4px 4px !important;
      border-radius: 100px !important;
      background: rgba(0, 102, 255, 0.04) !important;
      border: 1px solid rgba(0, 102, 255, 0.06) !important;
      height: auto !important;
      line-height: normal !important;
    }
    .profile-pill-btn:hover {
      background: rgba(0, 102, 255, 0.08) !important;
      border-color: rgba(0, 102, 255, 0.15) !important;
    }

    .avatar-wrap {
      position: relative;
      width: 34px;
      height: 34px;
    }
    .avatar-wrap img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0, 102, 255, 0.1);
    }
    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background: #34C759;
      border: 2.5px solid white;
      border-radius: 50%;
    }

    .icon-circle {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    ::ng-deep .glass-mat-menu {
      background: rgba(255, 255, 255, 0.98) !important;
      backdrop-filter: blur(25px) !important;
      border-radius: 1.25rem !important;
      border: 1px solid rgba(0, 102, 255, 0.1) !important;
      box-shadow: 0 15px 50px rgba(0, 102, 255, 0.12) !important;
      min-width: 220px !important;
      margin-top: 10px !important;
    }

    ::ng-deep .glass-mat-menu .mat-mdc-menu-content { padding: 0 !important; }
  `]
})
export class HeaderComponent {
  @Input() title: string = 'NexBodh';

  constructor(public sharedService: SharedService) {}
}
