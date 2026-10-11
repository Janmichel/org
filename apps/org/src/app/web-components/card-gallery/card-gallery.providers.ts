import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ShadowOverlayContainer } from './shadow-overlay-container';

export const cardGalleryConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    ShadowOverlayContainer,
    { provide: OverlayContainer, useExisting: ShadowOverlayContainer }
  ]
};
