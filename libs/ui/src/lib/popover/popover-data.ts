import { InjectionToken, TemplateRef } from '@angular/core';
import { OrgPopoverColor } from './popover.model';

export type OrgPopoverArrow = 'top' | 'bottom' | 'left' | 'right';

export interface OrgPopoverData {
  content: TemplateRef<unknown>;
  color: OrgPopoverColor;
  title: string;
  arrow: OrgPopoverArrow;
  showArrow: boolean;
  autoCaptureFocus: boolean;
  testId: string;
  panelId: string;
  close: () => void;
}

export const ORG_POPOVER_DATA = new InjectionToken<OrgPopoverData>(
  'OrgPopoverData'
);
