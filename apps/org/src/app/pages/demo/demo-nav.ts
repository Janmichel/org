export type DemoNavGroup = 'primary' | 'secondary';

export interface DemoNavItem {
  fragment: string;
  label: string;
  title: string;
  subtitle: string;
  icon: string;
  group: DemoNavGroup;
  accent?: boolean;
}

export const DEMO_NAV: readonly DemoNavItem[] = [
  {
    fragment: 'card',
    label: 'Card',
    title: 'Card',
    subtitle: 'Cartes article, sélection et call-to-action.',
    icon: 'style',
    group: 'primary'
  },
  {
    fragment: 'calendar',
    label: 'Calendar',
    title: 'Calendar',
    subtitle: 'Plage de dates, indicateur et actions.',
    icon: 'calendar_today',
    group: 'primary'
  },
  {
    fragment: 'button',
    label: 'Button',
    title: 'Button',
    subtitle: 'Filled, tonal, outlined — carré ou arrondi.',
    icon: 'smart_button',
    group: 'primary'
  },
  {
    fragment: 'checkbox',
    label: 'Checkbox',
    title: 'Checkbox',
    subtitle: 'Cases carrées et rondes.',
    icon: 'check_box',
    group: 'primary'
  },
  {
    fragment: 'toggle',
    label: 'Toggle',
    title: 'Toggle',
    subtitle: 'Interrupteur on/off.',
    icon: 'toggle_on',
    group: 'primary'
  },
  {
    fragment: 'chip',
    label: 'Chip',
    title: 'Chip',
    subtitle: 'Puces de statut, couleurs, icône et bordure.',
    icon: 'label',
    group: 'primary'
  },
  {
    fragment: 'tooltip',
    label: 'Tooltip',
    title: 'Tooltip',
    subtitle: 'Survol contextuel, adaptable à tout déclencheur.',
    icon: 'tips_and_updates',
    group: 'primary'
  },
  {
    fragment: 'popover',
    label: 'Popover',
    title: 'Popover',
    subtitle: 'Clic ou hover, flèche, formulaires.',
    icon: 'web_asset',
    group: 'primary'
  },
  {
    fragment: 'datepicker',
    label: 'Datepicker',
    title: 'Datepicker',
    subtitle: 'Wrapper Material — date unique ou plage.',
    icon: 'event',
    group: 'secondary'
  },
  {
    fragment: 'org-card',
    label: 'Org card',
    title: 'Org card',
    subtitle: 'Composant lib @org/ui.',
    icon: 'radio_button_unchecked',
    group: 'secondary'
  },
  {
    fragment: 'card-gallery',
    label: 'Gallery WC',
    title: 'Card gallery',
    subtitle: 'Web component Shadow DOM — grille JSON.',
    icon: 'view_module',
    group: 'secondary',
    accent: true
  }
];
