import { NgTemplateOutlet } from '@angular/common';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation
} from '@angular/core';
import { ORG_TOOLTIP_DATA } from './tooltip-data';
import { ORG_TOOLTIP_PANEL_CLASS } from './tooltip.model';
import { OrgTooltipTemplate } from './tooltip-template';

@Component({
  selector: 'org-tooltip-panel',
  imports: [NgTemplateOutlet, OrgTooltipTemplate],
  templateUrl: './tooltip-panel.html',
  styleUrl: './tooltip-panel.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('orgTooltipEnter', [
      transition('void => fade', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition('void => scale', [
        style({ opacity: 0, transform: 'scale(0.86)' }),
        animate(
          '220ms cubic-bezier(0.2, 0, 0, 1)',
          style({ opacity: 1, transform: 'none' })
        )
      ]),
      transition('void => slide', [
        style({ opacity: 0, transform: 'translateY(0.5rem)' }),
        animate(
          '220ms cubic-bezier(0.2, 0, 0, 1)',
          style({ opacity: 1, transform: 'none' })
        )
      ]),
      transition('void => bounce', [
        style({
          opacity: 0,
          transform: 'translateX(1.5rem) rotate(8deg) scale(0.84)'
        }),
        animate(
          '620ms cubic-bezier(0.22, 1.2, 0.36, 1)',
          keyframes([
            style({
              offset: 0,
              opacity: 0,
              transform: 'translateX(1.5rem) rotate(8deg) scale(0.84)'
            }),
            style({
              offset: 0.52,
              opacity: 1,
              transform: 'translateX(-0.35rem) rotate(-3deg) scale(1.06)'
            }),
            style({
              offset: 0.74,
              transform: 'translateX(0.14rem) rotate(1.5deg) scale(0.97)'
            }),
            style({
              offset: 0.88,
              transform: 'translateX(-0.05rem) rotate(-0.5deg) scale(1.01)'
            }),
            style({
              offset: 1,
              opacity: 1,
              transform: 'none'
            })
          ])
        )
      ])
    ])
  ],
  host: {
    role: 'tooltip',
    '[@orgTooltipEnter]': 'data.animation',
    '[class]': 'hostClasses',
    '[attr.id]': 'data.panelId || null',
    '[attr.data-testId]': 'data.testId'
  }
})
export class OrgTooltipPanel {
  protected readonly data = inject(ORG_TOOLTIP_DATA);

  protected readonly hostClasses = [
    ORG_TOOLTIP_PANEL_CLASS,
    `${ORG_TOOLTIP_PANEL_CLASS}--${this.data.color}`,
    `${ORG_TOOLTIP_PANEL_CLASS}--${this.data.animation}`,
    this.data.rich || this.data.content
      ? `${ORG_TOOLTIP_PANEL_CLASS}--rich`
      : ''
  ]
    .filter(Boolean)
    .join(' ');

  protected readonly hasMessage = Boolean(this.data.message.trim());
}
