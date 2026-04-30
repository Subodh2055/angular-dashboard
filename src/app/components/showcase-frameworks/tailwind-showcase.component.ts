import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassCardComponent } from '../glass-card/glass-card.component';

@Component({
  selector: 'app-tailwind-showcase',
  standalone: true,
  imports: [CommonModule, GlassCardComponent],
  template: `
    <div class="glass-container py-5 glass-animate">
      <div class="mb-5 text-center">
        <h1 class="glass-h1 glass-gradient-text mb-2">Tailwind CSS Utilities</h1>
        <p class="glass-text-lg glass-text-secondary">Rapidly build custom designs without leaving your HTML.</p>
      </div>

      <div class="row g-4">
        <!-- Layout Examples -->
        <div class="col-12">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Flexbox & Grid</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">1</div>
              <div class="h-24 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">2</div>
              <div class="h-24 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">3</div>
            </div>
            
            <div class="glass-code-block mt-4">
              <pre><code>&lt;div class="grid grid-cols-1 md:grid-cols-3 gap-4"&gt;
  &lt;div class="h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"&gt;1&lt;/div&gt;
  &lt;div class="h-24 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"&gt;2&lt;/div&gt;
  &lt;div class="h-24 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"&gt;3&lt;/div&gt;
&lt;/div&gt;</code></pre>
            </div>
          </app-glass-card>
        </div>

        <!-- Spacing & Sizing -->
        <div class="col-md-6">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Spacing & Sizing</h2>
            <div class="space-y-4">
              <div class="w-full bg-slate-100 p-4 border border-slate-200 rounded">p-4 (Padding)</div>
              <div class="w-3/4 bg-slate-100 p-4 border border-slate-200 rounded">w-3/4 (Width)</div>
              <div class="w-1/2 bg-slate-100 p-4 border border-slate-200 rounded">w-1/2 (Width)</div>
            </div>
          </app-glass-card>
        </div>

        <!-- Typography -->
        <div class="col-md-6">
          <app-glass-card [elevated]="true">
            <h2 class="glass-h4 mb-4">Typography</h2>
            <div class="space-y-2">
              <p class="text-xs">text-xs (Extra Small)</p>
              <p class="text-sm font-medium">text-sm font-medium</p>
              <p class="text-base font-bold italic">text-base font-bold italic</p>
              <p class="text-xl tracking-widest uppercase">text-xl uppercase</p>
            </div>
          </app-glass-card>
        </div>
      </div>
    </div>
  `
})
export class TailwindShowcaseComponent {}
