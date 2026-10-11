import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output
} from '@angular/core';
import { OrgCard } from '@org/ui';
import { CardGalleryItem } from './card-gallery.model';

@Component({
  selector: 'org-card-gallery-host',
  imports: [OrgCard],
  templateUrl: './card-gallery.html',
  styleUrl: './card-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  host: {
    class: 'org-card-gallery-host',
    'data-testId': 'org-card-gallery-host'
  }
})
export class CardGallery {
  /** Cartes à afficher (tableau JSON côté web component). */
  readonly items = input<readonly CardGalleryItem[]>([]);
  /** Nombre de colonnes fixes ; `0` = grille responsive auto-fill. */
  readonly columns = input(0);
  readonly ariaLabel = input('Galerie de cartes');

  readonly itemAction = output<{ item: CardGalleryItem; event: MouseEvent }>();
  readonly itemPlay = output<{ item: CardGalleryItem; event: MouseEvent }>();

  protected readonly gridTemplateColumns = computed(() => {
    const columns = this.columns();
    if (columns <= 0) {
      return null;
    }
    return `repeat(${columns}, minmax(0, 1fr))`;
  });

  protected trackItem(item: CardGalleryItem, index: number): string {
    return item.id ?? `${item.title}-${index}`;
  }

  protected onAction(item: CardGalleryItem, event: MouseEvent): void {
    this.itemAction.emit({ item, event });
  }

  protected onPlay(item: CardGalleryItem, event: MouseEvent): void {
    this.itemPlay.emit({ item, event });
  }
}
