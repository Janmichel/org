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
import { CardGallery } from '../../../web-components/card-gallery/card-gallery';
import { CardGalleryItem } from '../../../web-components/card-gallery/card-gallery.model';
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
    CardGallery,
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

  protected readonly galleryItems: readonly CardGalleryItem[] = (() => {
    const images = [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80'
    ];
    const titles = [
      'Best tools used in UX/UI Designers',
      'Design systems that scale',
      'Motion',
      'Galerie embarquable Shadow DOM',
      'Tokens Material',
      'Accessibilité WCAG AA pour les overlays',
      'Overlays',
      'Grille JSON responsive',
      'Composants',
      'Pattern web component réutilisable',
      'Focus clavier',
      'Surface et elevation Material 3'
    ];
    const descriptions = [
      undefined,
      'Court.',
      'Carte avec un texte un peu plus long pour varier la hauteur.',
      'This is the result of our ongoing efforts to improve the usability and customizability of these components across products.',
      'Une description moyenne pour rythmer la galerie masonry.',
      ''
    ];
    const ratios = [
      'wide',
      'landscape',
      'square',
      'portrait',
      'tall'
    ] as const;
    const labels = ['Label', 'Insight', 'Studio', 'Featured', 'Guide', 'Lab'];
    const authors = ['Olivia', 'Alex', 'Sam', 'Maya', 'Leo', 'Nina'];
    const count = 32;

    return Array.from({ length: count }, (_, index) => {
      const isCta = index % 3 === 1;
      const authorName = authors[index % authors.length];
      const description = descriptions[index % descriptions.length];
      const base: CardGalleryItem = {
        id: `g${index + 1}`,
        variant: isCta ? 'cta' : 'article',
        imageSrc: images[index % images.length],
        imageAlt: `Visuel abstrait ${index + 1}`,
        imageRatio: ratios[index % ratios.length],
        title: `${titles[index % titles.length]} #${index + 1}`,
        description: description || undefined,
        label: isCta ? undefined : labels[index % labels.length],
        meta: isCta ? undefined : `${(index % 7) + 2} min read`,
        actionLabel: isCta ? 'Découvrir' : undefined,
        author: isCta
          ? null
          : {
              name: authorName,
              avatarSrc: `https://i.pravatar.cc/80?img=${(index % 60) + 1}`,
              avatarAlt: authorName
            }
      };
      return base;
    });
  })();

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
