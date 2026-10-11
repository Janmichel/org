import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrgCard } from '@org/ui';
import { CardGalleryDialog } from './card-gallery-dialog';
import { CardGalleryItem } from './card-gallery.model';
import {
  ensureMaterialCdnInShadow,
  ensureMaterialCdnOnDocument
} from './material-cdn';
import { ShadowOverlayContainer } from './shadow-overlay-container';

@Component({
  selector: 'org-card-gallery-host',
  imports: [OrgCard],
  templateUrl: './card-gallery.html',
  styleUrl: './card-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    ShadowOverlayContainer,
    { provide: OverlayContainer, useExisting: ShadowOverlayContainer },
    MatDialog
  ],
  host: {
    class: 'org-card-gallery-host',
    'data-testId': 'org-card-gallery-host'
  }
})
export class CardGallery {
  private readonly dialog = inject(MatDialog);
  private readonly overlayContainer = inject(ShadowOverlayContainer);
  private readonly host = inject(ElementRef<HTMLElement>);

  /** Cartes à afficher (tableau JSON côté web component). */
  readonly items = input<readonly CardGalleryItem[]>([]);
  /** Nombre max de colonnes (responsive en dessous). */
  readonly columns = input(8);
  readonly ariaLabel = input('Galerie de cartes');
  /** Icône play custom optionnelle (sinon triangle Material). */
  readonly playIconSrc = input('');

  readonly itemAction = output<{ item: CardGalleryItem; event: MouseEvent }>();
  readonly itemPlay = output<{ item: CardGalleryItem; event: MouseEvent }>();
  readonly itemOpen = output<CardGalleryItem>();

  protected readonly maxColumns = computed(() => {
    const columns = this.columns();
    return columns > 0 ? columns : 8;
  });

  constructor() {
    ensureMaterialCdnOnDocument();
    const el = this.host.nativeElement;
    this.overlayContainer.attach(el.shadowRoot ?? el);

    afterNextRender(() => {
      const shadow = el.shadowRoot;
      if (shadow) {
        ensureMaterialCdnInShadow(shadow);
      }
    });
  }

  protected trackItem(item: CardGalleryItem, index: number): string {
    return item.id ?? `${item.title}-${index}`;
  }

  protected openDetail(item: CardGalleryItem): void {
    this.itemOpen.emit(item);
    this.dialog.open(CardGalleryDialog, {
      width: 'min(32rem, calc(100vw - 2rem))',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      ariaLabelledBy: 'org-card-gallery-dialog-title',
      panelClass: 'org-card-gallery-dialog-pane',
      data: item
    });
  }

  protected onCardActivate(item: CardGalleryItem, event: Event): void {
    const target = event.target;
    if (target instanceof Element && target.closest('button, a')) {
      return;
    }
    this.openDetail(item);
  }

  protected onAction(item: CardGalleryItem, event: MouseEvent): void {
    event.stopPropagation();
    this.itemAction.emit({ item, event });
    this.openDetail(item);
  }

  protected onPlay(item: CardGalleryItem, event: MouseEvent): void {
    event.stopPropagation();
    this.itemPlay.emit({ item, event });
    this.openDetail(item);
  }
}
