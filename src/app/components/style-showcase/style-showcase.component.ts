import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlassButtonComponent } from '../glass-button/glass-button.component';
import { GlassCardComponent } from '../glass-card/glass-card.component';
import { GlassBadgeComponent } from '../glass-badge/glass-badge.component';
import { GlassInputComponent } from '../glass-input/glass-input.component';
import { GlassAlertComponent } from '../glass-alert/glass-alert.component';
import { GlassSelectComponent, GlassSelectOption } from '../glass-select/glass-select.component';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-style-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    GlassButtonComponent,
    GlassCardComponent,
    GlassBadgeComponent,
    GlassInputComponent,
    GlassAlertComponent,
    GlassSelectComponent
  ],
  templateUrl: './style-showcase.component.html',
  styleUrl: './style-showcase.component.scss'
})
export class StyleShowcaseComponent {
  // Form models
  inputText = '';
  toggleValue = true;
  checkboxValue = true;
  radioValue = 'option1';
  
  // Accordion state
  accordionOpen = 1;
  
  // Tabs state
  activeTab = 1;
  
  // Progress value
  progressValue = 65;

  // Select data
  selectedRoles = ['admin', 'editor'];
  roleOptions: GlassSelectOption[] = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
    { label: 'Moderator', value: 'mod' },
    { label: 'Support Agent', value: 'support' },
    { label: 'Guest', value: 'guest' }
  ];
  
  singleValue = 'admin';
  disabledValue = 'viewer';

  // State for animations
  isSpinning = true;
  isPulsing = true;

  toggleAccordion(id: number): void {
    this.accordionOpen = this.accordionOpen === id ? 0 : id;
  }
}
