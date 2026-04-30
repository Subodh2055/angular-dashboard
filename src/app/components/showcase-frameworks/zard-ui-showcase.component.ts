import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardButtonComponent } from '../../shared/components/button/button.component';
import { GlassCardComponent } from '../glass-card/glass-card.component';

@Component({
  selector: 'app-zard-ui-showcase',
  standalone: true,
  imports: [CommonModule, ZardButtonComponent, GlassCardComponent],
  template: `
    <div class="glass-container py-5 glass-animate">
      <div class="mb-5 text-center">
        <h1 class="glass-h1 glass-gradient-text mb-2">ZardUI Components</h1>
        <p class="glass-text-lg glass-text-secondary">The shadcn/ui experience, natively built for Angular with Tailwind CSS.</p>
      </div>

      <div class="row g-4">
        <!-- Buttons -->
        <div class="col-12">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Atomic Button Component</h2>
            <div class="d-flex flex-wrap gap-4 align-items-center mb-5">
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Default</p>
                <button z-button>Button</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Secondary</p>
                <button z-button zType="secondary">Secondary</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Outline</p>
                <button z-button zType="outline">Outline</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Ghost</p>
                <button z-button zType="ghost">Ghost</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Destructive</p>
                <button z-button zType="destructive">Destructive</button>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-4 align-items-center">
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Small</p>
                <button z-button zSize="sm">Small</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Large</p>
                <button z-button zSize="lg">Large</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Loading State</p>
                <button z-button [zLoading]="true">Please wait</button>
              </div>
              <div class="text-center">
                <p class="glass-text-xs text-muted mb-2">Disabled</p>
                <button z-button [zDisabled]="true">Disabled</button>
              </div>
            </div>
            
            <div class="glass-code-block mt-5">
              <pre><code>&lt;!-- Basic Usage --&gt;
&lt;button z-button&gt;Default&lt;/button&gt;
&lt;button z-button zType="outline"&gt;Outline&lt;/button&gt;
&lt;button z-button [zLoading]="true"&gt;Loading...&lt;/button&gt;</code></pre>
            </div>
          </app-glass-card>
        </div>

        <!-- Documentation Card -->
        <div class="col-12">
          <div class="glass-panel text-center py-5 border-dashed border-2">
            <h4 class="glass-h4 mb-3">Modular Components</h4>
            <p class="glass-text-sm text-muted max-w-2xl mx-auto">
              ZardUI components are copied directly into your <code>shared/components</code> folder. 
              This gives you full ownership of the source code, allowing for infinite customization 
              while maintaining a consistent design system.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ZardUIShowcaseComponent {}
