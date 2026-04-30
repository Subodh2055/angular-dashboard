import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassCardComponent } from '../glass-card/glass-card.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { 
  lucideHome, lucideUser, lucideSettings, lucideBell, 
  lucideSearch, lucideMail, lucideCalendar, lucideCheckCircle,
  lucideAlertCircle, lucideTrash2, lucideEdit, lucideDownload
} from '@ng-icons/lucide';

@Component({
  selector: 'app-icons-showcase',
  standalone: true,
  imports: [CommonModule, GlassCardComponent],
  /* viewProviders: [provideIcons({ 
    lucideHome, lucideUser, lucideSettings, lucideBell, 
    lucideSearch, lucideMail, lucideCalendar, lucideCheckCircle,
    lucideAlertCircle, lucideTrash2, lucideEdit, lucideDownload
  })], */
  template: `
    <div class="glass-container py-5 glass-animate">
      <div class="mb-5 text-center">
        <h1 class="glass-h1 glass-gradient-text mb-2">Iconography System</h1>
        <p class="glass-text-lg glass-text-secondary">Unified icon set using Bootstrap Icons and Lucide Icons via Ng-Icons.</p>
      </div>

      <div class="row g-4">
        <!-- Bootstrap Icons (CSS based) -->
        <div class="col-12">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Bootstrap Icons (Native CSS)</h2>
            <div class="d-flex flex-wrap gap-4 text-center">
              <div><i class="bi bi-house glass-h2 d-block"></i><small>house</small></div>
              <div><i class="bi bi-person glass-h2 d-block text-primary"></i><small>person</small></div>
              <div><i class="bi bi-gear glass-h2 d-block text-secondary"></i><small>gear</small></div>
              <div><i class="bi bi-bell glass-h2 d-block text-warning"></i><small>bell</small></div>
              <div><i class="bi bi-check-circle glass-h2 d-block text-success"></i><small>check</small></div>
              <div><i class="bi bi-exclamation-triangle glass-h2 d-block text-error"></i><small>warning</small></div>
            </div>
            <div class="glass-code-block mt-4">
              <pre><code>&lt;i class="bi bi-person text-primary"&gt;&lt;/i&gt;</code></pre>
            </div>
          </app-glass-card>
        </div>

        <!-- Lucide Icons (SVG based via Ng-Icons) -->
        <div class="col-12">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Lucide Icons (SVG / Ng-Icons)</h2>
            <div class="d-flex flex-wrap gap-5 text-center">
              <p class="text-muted italic">Iconography system is being initialized...</p>
            </div>
          </app-glass-card>
        </div>
      </div>
    </div>
  `
})
export class IconsShowcaseComponent {}
