import {
  ApplicationRef,
  ComponentRef,
  createComponent
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { OverlayLab } from './overlay-lab';
import { overlayLabConfig } from './overlay-lab.providers';

const ELEMENT_NAME = 'org-overlay-lab';

const FONT_HREFS = [
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

function ensureDocumentFonts(): void {
  for (const href of FONT_HREFS) {
    if (document.querySelector(`link[href="${href}"]`)) {
      continue;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

export class OrgOverlayLabElement extends HTMLElement {
  private appRef: ApplicationRef | null = null;
  private componentRef: ComponentRef<OverlayLab> | null = null;
  private isBootstrapping = false;

  async connectedCallback(): Promise<void> {
    if (this.appRef || this.isBootstrapping) {
      return;
    }

    this.isBootstrapping = true;
    ensureDocumentFonts();

    const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '';

    const pending = document.createElement('div');
    pending.textContent = 'Chargement du web component…';
    pending.style.cssText =
      'padding:1rem;font:500 0.95rem/1.4 Roboto,sans-serif';
    shadow.appendChild(pending);

    try {
      const appRef = await createApplication(overlayLabConfig);
      if (!this.isConnected) {
        appRef.destroy();
        return;
      }

      const mount = document.createElement('div');
      mount.setAttribute('data-org-overlay-lab-root', '');
      pending.remove();
      shadow.appendChild(mount);

      const componentRef = createComponent(OverlayLab, {
        environmentInjector: appRef.injector,
        hostElement: mount
      });
      appRef.attachView(componentRef.hostView);
      componentRef.changeDetectorRef.detectChanges();

      this.appRef = appRef;
      this.componentRef = componentRef;
    } catch (error) {
      pending.textContent =
        'Impossible de démarrer le web component overlay-lab.';
      console.error(error);
    } finally {
      this.isBootstrapping = false;
    }
  }

  disconnectedCallback(): void {
    this.componentRef?.destroy();
    this.appRef?.destroy();
    this.componentRef = null;
    this.appRef = null;
  }
}

export function defineOrgOverlayLab(): void {
  if (!customElements.get(ELEMENT_NAME)) {
    customElements.define(ELEMENT_NAME, OrgOverlayLabElement);
  }
}
