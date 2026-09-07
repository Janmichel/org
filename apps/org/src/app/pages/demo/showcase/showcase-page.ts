import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  OrgCard,
  OrgChip,
  OrgChipColor,
  OrgPopover,
  OrgTooltip,
  OrgTooltipAnimation,
  OrgTooltipColor,
  OrgTooltipRichContent,
  OrgTooltipTemplate
} from '@org/ui';
import { DemoCard } from '../card/demo-card';
import { DemoCalendar } from '../calendar/demo-calendar';
import { DemoDatepicker } from '../datepicker/demo-datepicker';

@Component({
  selector: 'app-showcase-page',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    OrgCard,
    OrgChip,
    OrgPopover,
    OrgTooltip,
    OrgTooltipTemplate,
    DemoCard,
    DemoCalendar,
    DemoDatepicker
  ],
  templateUrl: './showcase-page.html',
  styleUrl: './showcase-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePage {
  protected readonly articleSelected = signal(false);
  protected readonly splitSelected = signal(false);
  protected readonly overlaySelected = signal(false);
  protected readonly featuredSelected = signal(false);

  protected readonly selectedCount = computed(
    () =>
      [
        this.articleSelected(),
        this.splitSelected(),
        this.overlaySelected(),
        this.featuredSelected()
      ].filter(Boolean).length
  );

  protected readonly author = {
    name: 'Olivia Quinn',
    avatarSrc: 'https://i.pravatar.cc/80?img=32',
    avatarAlt: 'Olivia Quinn'
  };

  protected readonly article = {
    imageSrc:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Vague abstraite orange et violette',
    label: 'Label',
    date: 'June 18, 2023',
    title: 'Best tools used in UX/UI Designers',
    description:
      'This is the result of our ongoing efforts to improve the usability and customizability of these components.',
    actionLabel: 'Read more',
    meta: '3 MIN READ'
  };

  protected readonly split = {
    imageSrc:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Dégradé fluide multicolore',
    label: 'Insight',
    date: 'May 02, 2024',
    title: 'Design systems that scale with product teams',
    description:
      'Une lecture horizontale pour les listes éditoriales et les mises en avant.',
    actionLabel: 'Découvrir',
    meta: '5 MIN READ'
  };

  protected readonly overlay = {
    imageSrc:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Formes 3D colorées',
    label: 'Featured',
    title: 'Motion, profondeur et verre dépoli',
    actionLabel: 'Lire',
    meta: '4 MIN READ'
  };

  protected readonly featured = {
    imageSrc:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Néons abstraits',
    label: 'Studio',
    date: 'April 12, 2024',
    title: 'Une card éditoriale qui déborde de l’image',
    description:
      'Le panneau blanc remonte sur le média pour un rythme plus magazine.',
    actionLabel: 'Voir le cas',
    meta: '6 MIN READ'
  };

  protected readonly orgArticleCard = {
    imageSrc:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Dégradé abstrait coloré',
    label: 'Label',
    title: 'Best tools used in UX/UI Designers',
    description:
      'This is the result of our ongoing efforts to improve the usability',
    author: {
      name: 'Olivia',
      avatarSrc: 'https://i.pravatar.cc/80?img=47',
      avatarAlt: 'Olivia'
    },
    meta: '3 min read'
  };

  protected readonly orgCtaCard = {
    imageSrc:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Composition abstraite colorée',
    title: 'Best tools used in UX/UI Designers',
    description:
      'This is the result of our ongoing efforts to improve the usability',
    actionLabel: 'Button text'
  };

  protected readonly buttonShapes = ['square', 'rounded'] as const;
  protected readonly buttonVariants = ['filled', 'tonal', 'outlined'] as const;

  protected readonly chipColors: readonly OrgChipColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'success',
    'warning',
    'error'
  ];

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

  protected readonly inviteEmail = signal('');
  protected readonly inviteRole = signal('viewer');
  protected readonly inviteSent = signal(false);

  protected readonly projectForm = {
    name: signal('Design system Q3'),
    client: signal('JCDecaux'),
    owner: signal('Olivia Quinn'),
    email: signal('olivia@studio.com'),
    phone: signal('+33 6 12 34 56 78'),
    team: signal('product'),
    priority: signal('high'),
    startDate: signal('2026-09-01'),
    endDate: signal('2026-12-15'),
    budget: signal('42000'),
    notifyEmail: signal(true),
    notifySlack: signal(true),
    notifyDigest: signal(false),
    publicLink: signal(false),
    description: signal(
      'Refonte des overlays (tooltip, popover) et validation accessibilité WCAG AA.'
    ),
    notes: signal('')
  };

  protected readonly projectSaved = signal(false);

  protected submitInvite(popover: OrgPopover): void {
    if (!this.inviteEmail().trim()) {
      return;
    }
    this.inviteSent.set(true);
    popover.hide();
  }

  protected submitProject(popover: OrgPopover): void {
    if (!this.projectForm.name().trim()) {
      return;
    }
    this.projectSaved.set(true);
    popover.hide();
  }
}
