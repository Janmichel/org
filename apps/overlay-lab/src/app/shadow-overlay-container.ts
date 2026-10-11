import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

/**
 * Overlay CDK du web component : le container est collé au host Shadow
 * (dialog + menus restent dans l'encapsulation) ou renvoyé sur document.body
 * pour visualiser les collisions avec l'application hôte.
 */
@Injectable()
export class ShadowOverlayContainer extends OverlayContainer {
  private host: HTMLElement | ShadowRoot | null = null;

  attach(host: HTMLElement | ShadowRoot): void {
    this.host = host;
    this.recreate();
  }

  useDocumentBody(): void {
    this.host = this._document.body;
    this.recreate();
  }

  private recreate(): void {
    this._containerElement?.remove();
    this._containerElement = undefined;
    this._createContainer();
  }

  protected override _createContainer(): void {
    const container = this._document.createElement('div');
    container.classList.add('cdk-overlay-container');
    container.setAttribute('data-org-overlay-lab', '');
    const parent = this.host ?? this._document.body;
    parent.appendChild(container);
    this._containerElement = container;
  }
}
