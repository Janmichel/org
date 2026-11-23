import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, map, startWith } from 'rxjs';
import { DEMO_NAV } from './demo-nav';

@Component({
  selector: 'app-demo-layout',
  imports: [RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './demo-layout.html',
  styleUrl: './demo-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLayout {
  private readonly router = inject(Router);

  protected readonly primaryItems = DEMO_NAV.filter(
    (item) => item.group === 'primary'
  );
  protected readonly secondaryItems = DEMO_NAV.filter(
    (item) => item.group === 'secondary'
  );

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  protected readonly current = computed(() => {
    const active = DEMO_NAV.find((item) =>
      this.url().includes(`/demo/${item.path}`)
    );
    return active ?? DEMO_NAV[0];
  });
}
