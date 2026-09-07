export type OrgTooltipPosition =
  | 'above'
  | 'below'
  | 'left'
  | 'right'
  | 'before'
  | 'after';

export type OrgTooltipColor =
  | 'inverse'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error';

export type OrgTooltipAnimation = 'fade' | 'scale' | 'slide' | 'bounce';

/** Panel class always applied by `orgTooltip`. */
export const ORG_TOOLTIP_PANEL_CLASS = 'org-tooltip-panel';
