import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrgCard } from '@org/ui';

@Component({
  selector: 'app-card-page',
  imports: [OrgCard],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPage {
  protected readonly articleCard = {
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
      avatarAlt: 'Olivia',
    },
    meta: '3 min read',
  };

  protected readonly ctaCard = {
    imageSrc:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Composition abstraite colorée',
    title: 'Best tools used in UX/UI Designers',
    description:
      'This is the result of our ongoing efforts to improve the usability',
    actionLabel: 'Button text',
  };
}
