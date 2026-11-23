import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export type DemoCardVariant = 'article' | 'split' | 'overlay' | 'featured';

export interface DemoCardAuthor {
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
}

@Component({
  selector: 'app-demo-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './demo-card.html',
  styleUrl: './demo-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'demo-card-host',
    '[attr.data-variant]': 'variant()'
  }
})
export class DemoCard {
  readonly variant = input<DemoCardVariant>('article');
  readonly imageSrc = input.required<string>();
  readonly imageAlt = input('');
  readonly label = input('');
  readonly date = input('');
  readonly author = input<DemoCardAuthor | null>(null);
  readonly title = input.required<string>();
  readonly description = input('');
  readonly actionLabel = input('Read more');
  readonly meta = input('');
  readonly selected = model(false);
  /** Fond contrasté (surface) derrière la checkbox, utile sur média coloré. */
  readonly selectFilled = input(false);

  readonly actionClick = output<MouseEvent>();

  toggleSelected(): void {
    this.selected.update((isSelected) => !isSelected);
  }
}
