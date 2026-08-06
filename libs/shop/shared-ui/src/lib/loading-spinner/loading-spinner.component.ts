import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KisProgressSpinner } from '@dms/kis-design-system/progress-spinner';

@Component({
  selector: 'shop-loading-spinner',
  imports: [KisProgressSpinner],
  template: `
    <div class="shop-loading-spinner" role="status" aria-live="polite">
      <kis-progress-spinner size="md" data-testId="shop-loading-spinner" />
      <p>Loading...</p>
    </div>
  `,
  styles: [
    `
      .shop-loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px;
        gap: 16px;
      }

      p {
        margin: 0;
        color: var(--kis-on-surface-variant, #666);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {}
