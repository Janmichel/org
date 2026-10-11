import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { OrgCardAuthor, OrgCardVariant } from './card.model';

@Component({
  selector: 'org-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'org-card',
  },
})
export class OrgCard {
  readonly variant = input<OrgCardVariant>('article');
  readonly imageSrc = input.required<string>();
  readonly imageAlt = input('');
  readonly label = input('');
  readonly title = input.required<string>();
  readonly description = input('');
  readonly author = input<OrgCardAuthor | null>(null);
  readonly meta = input('');
  readonly actionLabel = input('');
  readonly playAriaLabel = input('Lecture');
  /** Icône custom (image) à la place de `play_arrow`. */
  readonly playIconSrc = input('');
  readonly leadingIcon = input('lens');

  readonly playClick = output<MouseEvent>();
  readonly actionClick = output<MouseEvent>();

  protected readonly isArticle = computed(() => this.variant() === 'article');
  protected readonly isCta = computed(() => this.variant() === 'cta');
  protected readonly hasAuthor = computed(() => Boolean(this.author()?.name));
  protected readonly hasAction = computed(() => Boolean(this.actionLabel()));
  protected readonly hasPlayIcon = computed(() => Boolean(this.playIconSrc()));
}
