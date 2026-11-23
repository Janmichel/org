import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { DemoCard } from './demo-card';

@Component({
  selector: 'app-card-demo-page',
  imports: [DemoCard],
  templateUrl: './card-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDemoPage {
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
}
