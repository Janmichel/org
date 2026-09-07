import { NgTemplateOutlet } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ORG_POPOVER_DATA, OrgPopoverArrow } from './popover-data';
import { ORG_POPOVER_PANEL_CLASS } from './popover.model';

@Component({
  selector: 'org-popover-panel',
  imports: [NgTemplateOutlet, CdkTrapFocus, MatIconButton, MatIcon],
  templateUrl: './popover-panel.html',
  styleUrl: './popover-panel.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('orgPopoverEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0.35rem) scale(0.97)' }),
        animate(
          '180ms cubic-bezier(0.2, 0, 0, 1)',
          style({ opacity: 1, transform: 'none' })
        )
      ])
    ])
  ],
  host: {
    '[@orgPopoverEnter]': 'true',
    '[class]': 'hostClasses()',
    '[attr.data-testId]': 'data.testId',
    '[attr.data-arrow]': 'arrow()'
  }
})
export class OrgPopoverPanel {
  protected readonly data = inject(ORG_POPOVER_DATA);
  protected readonly arrow = signal<OrgPopoverArrow>(this.data.arrow);

  protected readonly hostClasses = computed(() =>
    [
      ORG_POPOVER_PANEL_CLASS,
      `${ORG_POPOVER_PANEL_CLASS}--${this.data.color}`,
      this.data.showArrow
        ? `${ORG_POPOVER_PANEL_CLASS}--arrow-${this.arrow()}`
        : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  setArrow(next: OrgPopoverArrow): void {
    this.arrow.set(next);
  }

  protected close(): void {
    this.data.close();
  }
}
