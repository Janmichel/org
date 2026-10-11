import {
  ApplicationRef,
  ComponentRef,
  OutputRefSubscription,
  createComponent
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { CardGallery } from './card-gallery';
import {
  CardGalleryItem,
  parseCardGalleryItems
} from './card-gallery.model';
import { cardGalleryConfig } from './card-gallery.providers';
import { ensureMaterialCdnOnDocument } from './material-cdn';

const ELEMENT_NAME = 'org-card-gallery';

export class OrgCardGalleryElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['items', 'columns', 'aria-label'];
  }

  private appRef: ApplicationRef | null = null;
  private componentRef: ComponentRef<CardGallery> | null = null;
  private actionSub: OutputRefSubscription | null = null;
  private playSub: OutputRefSubscription | null = null;
  private openSub: OutputRefSubscription | null = null;
  private isBootstrapping = false;
  private itemsValue: CardGalleryItem[] = [];

  get items(): CardGalleryItem[] {
    return this.itemsValue;
  }

  set items(value: CardGalleryItem[] | string | null | undefined) {
    this.itemsValue = parseCardGalleryItems(value);
    this.syncInputs();
  }

  async connectedCallback(): Promise<void> {
    if (this.appRef || this.isBootstrapping) {
      return;
    }

    this.isBootstrapping = true;
    ensureMaterialCdnOnDocument();
    this.itemsValue = parseCardGalleryItems(
      this.getAttribute('items') ?? this.itemsValue
    );

    try {
      const appRef = await createApplication(cardGalleryConfig);
      if (!this.isConnected) {
        appRef.destroy();
        return;
      }

      const componentRef = createComponent(CardGallery, {
        environmentInjector: appRef.injector,
        hostElement: this
      });
      appRef.attachView(componentRef.hostView);

      this.actionSub = componentRef.instance.itemAction.subscribe((detail) => {
        this.dispatchEvent(
          new CustomEvent('item-action', {
            detail,
            bubbles: true,
            composed: true
          })
        );
      });
      this.playSub = componentRef.instance.itemPlay.subscribe((detail) => {
        this.dispatchEvent(
          new CustomEvent('item-play', {
            detail,
            bubbles: true,
            composed: true
          })
        );
      });
      this.openSub = componentRef.instance.itemOpen.subscribe((item) => {
        this.dispatchEvent(
          new CustomEvent('item-open', {
            detail: { item },
            bubbles: true,
            composed: true
          })
        );
      });

      this.appRef = appRef;
      this.componentRef = componentRef;
      this.syncInputs();
      componentRef.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Impossible de démarrer org-card-gallery.', error);
    } finally {
      this.isBootstrapping = false;
    }
  }

  disconnectedCallback(): void {
    this.actionSub?.unsubscribe();
    this.playSub?.unsubscribe();
    this.openSub?.unsubscribe();
    this.actionSub = null;
    this.playSub = null;
    this.openSub = null;
    this.componentRef?.destroy();
    this.appRef?.destroy();
    this.componentRef = null;
    this.appRef = null;
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    if (name === 'items') {
      this.itemsValue = parseCardGalleryItems(newValue);
    }
    this.syncInputs();
  }

  private syncInputs(): void {
    const ref = this.componentRef;
    if (!ref) {
      return;
    }

    ref.setInput('items', this.itemsValue);

    const columnsAttr = this.getAttribute('columns');
    if (columnsAttr != null && columnsAttr !== '') {
      const columns = Number(columnsAttr);
      if (Number.isFinite(columns) && columns >= 0) {
        ref.setInput('columns', Math.floor(columns));
      }
    }

    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel) {
      ref.setInput('ariaLabel', ariaLabel);
    }

    ref.changeDetectorRef.detectChanges();
  }
}

export function defineOrgCardGallery(): void {
  if (!customElements.get(ELEMENT_NAME)) {
    customElements.define(ELEMENT_NAME, OrgCardGalleryElement);
  }
}
