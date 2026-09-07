import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, map, startWith } from 'rxjs';
import { DEMO_NAV } from './demo-nav';
import { ShowcasePage } from './showcase/showcase-page';

@Component({
  selector: 'app-demo-layout',
  imports: [RouterLink, MatIconModule, ShowcasePage],
  templateUrl: './demo-layout.html',
  styleUrl: './demo-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLayout {
  private readonly router = inject(Router);

  protected readonly primaryItems = DEMO_NAV.filter((item) => item.group === 'primary');
  protected readonly secondaryItems = DEMO_NAV.filter(
    (item) => item.group === 'secondary'
  );

  private readonly fragment = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.parseUrl(this.router.url).fragment),
      startWith(this.router.parseUrl(this.router.url).fragment)
    ),
    { initialValue: this.router.parseUrl(this.router.url).fragment }
  );

  protected readonly current = computed(
    () =>
      DEMO_NAV.find((item) => item.fragment === this.fragment()) ?? DEMO_NAV[0]
  );
}
