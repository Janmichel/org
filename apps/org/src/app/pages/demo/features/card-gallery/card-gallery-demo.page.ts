import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardGallery } from '../../../../web-components/card-gallery/card-gallery';
import { CardGalleryItem } from '../../../../web-components/card-gallery/card-gallery.model';

@Component({
  selector: 'app-card-gallery-demo-page',
  imports: [CardGallery],
  templateUrl: './card-gallery-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGalleryDemoPage {
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

    return Array.from({ length: 32 }, (_, index) => {
      const isCta = index % 3 === 1;
      const authorName = authors[index % authors.length];
      const description = descriptions[index % descriptions.length];
      return {
        id: `g${index + 1}`,
        variant: (isCta ? 'cta' : 'article') as 'article' | 'cta',
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
    });
  })();
}
