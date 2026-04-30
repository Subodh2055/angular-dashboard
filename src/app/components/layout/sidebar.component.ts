import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../shared/shared.service';

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive,
    MatListModule,
    MatExpansionModule,
    MatIconModule
  ],
  template: `
    <aside class="glass-sidebar shadow-sm" [class.collapsed]="sharedService.isSidebarCollapsed$ | async">
      <div class="sidebar-scroll py-3">
        <mat-nav-list class="glass-nav-list">
          
          <ng-container *ngFor="let item of menuItems">
            <!-- Item with Children (Expansion Panel) -->
            <mat-expansion-panel *ngIf="item.children" 
                                [expanded]="item.isOpen && !(sharedService.isSidebarCollapsed$ | async)" 
                                (opened)="item.isOpen = true" 
                                (closed)="item.isOpen = false"
                                class="glass-expansion-panel mb-1">
              <mat-expansion-panel-header class="glass-expansion-header">
                <mat-panel-title class="d-flex align-items-center">
                  <mat-icon *ngIf="item.icon" class="me-3 fs-5">{{ item.icon }}</mat-icon>
                  <span class="menu-label">{{ item.label }}</span>
                </mat-panel-title>
              </mat-expansion-panel-header>

              <mat-nav-list class="ms-3 border-start border-primary border-opacity-10 py-0">
                <ng-container *ngFor="let child of item.children">
                  
                  <!-- Child with more Children (Nested child inside child) -->
                  <mat-expansion-panel *ngIf="child.children" 
                                      class="glass-expansion-panel sub-expansion mb-1"
                                      [expanded]="child.isOpen"
                                      (opened)="child.isOpen = true"
                                      (closed)="child.isOpen = false">
                    <mat-expansion-panel-header class="glass-expansion-header sub-header">
                      <mat-panel-title class="glass-text-sm menu-label">{{ child.label }}</mat-panel-title>
                    </mat-expansion-panel-header>
                    
                    <mat-nav-list class="ms-3 border-start border-secondary border-opacity-10 py-0">
                      <a mat-list-item 
                         *ngFor="let subChild of child.children"
                         [routerLink]="subChild.route"
                         routerLinkActive="active-link"
                         class="glass-list-item mb-1">
                        <span matListItemTitle class="glass-text-xs menu-label">{{ subChild.label }}</span>
                      </a>
                    </mat-nav-list>
                  </mat-expansion-panel>

                  <!-- Basic Child -->
                  <a mat-list-item 
                     *ngIf="!child.children"
                     [routerLink]="child.route"
                     routerLinkActive="active-link"
                     class="glass-list-item mb-1">
                    <span matListItemTitle class="glass-text-sm menu-label">{{ child.label }}</span>
                  </a>
                </ng-container>
              </mat-nav-list>
            </mat-expansion-panel>

            <!-- Basic Top-Level Item -->
            <a mat-list-item 
               *ngIf="!item.children"
               [routerLink]="item.route"
               routerLinkActive="active-link"
               class="glass-list-item mb-1">
              <mat-icon matListItemIcon *ngIf="item.icon" class="me-3 fs-5">{{ item.icon }}</mat-icon>
              <span matListItemTitle class="menu-label">{{ item.label }}</span>
            </a>
          </ng-container>

        </mat-nav-list>
      </div>
    </aside>
  `,
  styles: [`
    .glass-sidebar {
      width: 280px;
      height: calc(100vh - 70px);
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      border-right: 1px solid rgba(0, 102, 255, 0.05);
      position: sticky;
      top: 70px;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .glass-sidebar.collapsed {
      width: 80px;
    }

    .glass-sidebar.collapsed .menu-label,
    .glass-sidebar.collapsed ::ng-deep .mat-expansion-indicator {
      display: none !important;
    }
    
    .sidebar-scroll { height: 100%; overflow-y: auto; overflow-x: hidden; }
    
    .glass-nav-list { padding: 0.75rem !important; }
    
    .glass-expansion-panel {
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
    }
    
    .glass-expansion-header {
      border-radius: 0.75rem !important;
      height: 48px !important;
      padding: 0 1rem !important;
    }
    .glass-expansion-header:hover { background: rgba(0, 102, 255, 0.05); }
    
    .glass-list-item {
      border-radius: 0.75rem !important;
      margin-bottom: 4px !important;
      height: 40px !important;
    }
    .glass-list-item:hover { background: rgba(0, 102, 255, 0.05); }
    
    .active-link {
      background: var(--glass-primary) !important;
      color: white !important;
      box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);
    }
    .active-link ::ng-deep .mdc-list-item__primary-text { color: white !important; }
    
    ::ng-deep .mat-expansion-panel-body { padding: 0 !important; }
    ::ng-deep .mat-expansion-indicator::after { color: var(--glass-text-muted); }
  `]
})
export class SidebarComponent {
  constructor(public sharedService: SharedService) {}

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/users' },
    { 
      label: 'Design Guide', 
      icon: 'palette',
      isOpen: false,
      children: [
        { label: 'Core Styles', route: '/showcase' },
        { 
          label: 'Frameworks', 
          isOpen: false,
          children: [
            { label: 'Tailwind CSS', route: '/showcase/tailwind' },
            { label: 'Angular Material', route: '/showcase/material' },
            { label: 'ZardUI (Shadcn)', route: '/showcase/zardui' }
          ]
        },
        { 
          label: 'Utilities', 
          isOpen: false,
          children: [
            { label: 'Icon System', route: '/showcase/icons' },
            { label: 'Advanced Forms', route: '/showcase/forms' }
          ]
        }
      ]
    },
    { 
      label: 'User Management', 
      icon: 'people',
      isOpen: false,
      children: [
        { label: 'List View', route: '/users' },
        { label: 'Create New User', route: '/users' }
      ]
    }
  ];

  toggleMenu(item: MenuItem): void {
    item.isOpen = !item.isOpen;
  }
}
