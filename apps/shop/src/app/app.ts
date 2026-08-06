import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OverlayThemeService } from '@dms/kis-design-system/core';
import { KisLayoutContainer } from '@dms/kis-design-system/layout-container';
import { KisLayoutHeader } from '@dms/kis-design-system/layout-header';
import { KisButtonModule } from '@dms/kis-design-system/button';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    KisLayoutContainer,
    KisLayoutHeader,
    KisButtonModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnDestroy {
  private readonly overlayThemeService = inject(OverlayThemeService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly title = signal('Nx Shop Demo');
  protected readonly description = signal(
    'E-commerce showcase powered by the KIS Design System'
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => this.overlayThemeService.attachTheme());
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.overlayThemeService.detachTheme();
    }
  }
}
