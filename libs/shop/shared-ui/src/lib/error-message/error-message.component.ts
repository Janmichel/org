import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { KisEmptyState } from '@dms/kis-design-system/empty-state';
import { KisStrokedButton } from '@dms/kis-design-system/button';

@Component({
  selector: 'shop-error-message',
  imports: [KisEmptyState, KisStrokedButton],
  template: `
    <ng-template #retryAction>
      <button
        kis-stroked-button
        type="button"
        color="primary"
        data-testId="shop-error-retry"
        (click)="retry.emit()"
      >
        Try again
      </button>
    </ng-template>

    <kis-empty-state
      [variant]="variant()"
      [title]="title() || defaultTitle"
      [description]="message() || defaultMessage"
      [actionButton]="showRetry() ? retryAction : undefined"
      data-testId="shop-error-message"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  readonly title = input<string>();
  readonly message = input<string>();
  readonly showRetry = input(true);
  readonly variant = input<'unable-to-load' | 'no-results'>('unable-to-load');
  readonly retry = output<void>();

  protected readonly defaultTitle = 'Something went wrong';
  protected readonly defaultMessage =
    'An unexpected error occurred. Please try again later.';
}
