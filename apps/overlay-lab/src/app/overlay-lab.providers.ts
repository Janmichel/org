import { OverlayContainer, OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideOrgDatepicker } from '@org/ui';
import { ShadowOverlayContainer } from './shadow-overlay-container';

/** Muté au runtime : false dans le Shadow DOM, true sur body (top layer vs dialog hôte). */
export const overlayLabOverlayDefaults = {
  usePopover: false
};

export const overlayLabConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    ...provideOrgDatepicker('fr-FR'),
    ShadowOverlayContainer,
    { provide: OverlayContainer, useExisting: ShadowOverlayContainer },
    { provide: OVERLAY_DEFAULT_CONFIG, useValue: overlayLabOverlayDefaults }
  ]
};
