import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatChip, MatChipSet, MatChipAvatar } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { OrgChipColor } from './chip.model';

@Component({
  selector: 'org-chip',
  imports: [MatChipSet, MatChip, MatChipAvatar, MatIcon],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'org-chip',
    '[class.org-chip--bordered]': 'bordered()',
    '[attr.data-color]': 'color()'
  }
})
export class OrgChip {
  readonly label = input.required<string>();
  readonly color = input<OrgChipColor>('neutral');
  readonly icon = input('');
  readonly bordered = input(false);
  readonly rounded = input(false);
  readonly disabled = input(false);

  protected readonly hasIcon = computed(() => Boolean(this.icon()));
}
