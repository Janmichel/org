import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  OrgChip,
  OrgTooltip,
  OrgTooltipAnimation,
  OrgTooltipColor,
  OrgTooltipRichContent,
  OrgTooltipTemplate
} from '@org/ui';

@Component({
  selector: 'app-tooltip-demo-page',
  imports: [
    MatButtonModule,
    OrgChip,
    OrgTooltip,
    OrgTooltipTemplate
  ],
  templateUrl: './tooltip-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipDemoPage {
  protected readonly tooltipColors: readonly OrgTooltipColor[] = [
    'inverse',
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'success',
    'warning',
    'error'
  ];

  protected readonly tooltipAnimations: readonly OrgTooltipAnimation[] = [
    'fade',
    'scale',
    'slide',
    'bounce'
  ];

  protected readonly syncTooltipRich: OrgTooltipRichContent = {
    eyebrow: 'Sync cloud',
    title: 'Dernière sync',
    meta: 'Il y a 2 minutes · 14 fichiers'
  };
}
