import { InjectionToken, TemplateRef } from '@angular/core';
import {
  OrgTooltipAnimation,
  OrgTooltipColor
} from './tooltip.model';
import { OrgTooltipRichContent } from './tooltip-template.model';

export interface OrgTooltipData {
  message: string;
  content: TemplateRef<unknown> | null;
  rich: OrgTooltipRichContent | null;
  color: OrgTooltipColor;
  animation: OrgTooltipAnimation;
  testId: string;
  panelId: string;
}

export const ORG_TOOLTIP_DATA = new InjectionToken<OrgTooltipData>(
  'OrgTooltipData'
);
