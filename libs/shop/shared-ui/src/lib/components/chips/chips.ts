import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'shop-chips',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './chips.html',
  styleUrl: './chips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chips {
  readonly maximumVisibleChips = 4;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<Fruit[]>([
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
    { name: 'orange' },
    { name: 'banane' },
  ]);
  readonly visibleFruits = computed(() =>
    this.fruits().slice(0, this.maximumVisibleChips),
  );
  readonly hiddenFruits = computed(() =>
    this.fruits().slice(this.maximumVisibleChips),
  );
  readonly hiddenFruitCount = computed(() => this.hiddenFruits().length);
  readonly overflowExpanded = signal(false);
  readonly chipInput = viewChild<ElementRef<HTMLInputElement>>('chipInput');
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.update((fruits) => [...fruits, { name: value }]);
    }
    event.chipInput?.clear();
  }

  remove(fruit: Fruit): void {
    const fruitExists = this.fruits().includes(fruit);
    if (!fruitExists) {
      return;
    }

    this.fruits.update((fruits) => fruits.filter((item) => item !== fruit));
    this.announcer.announce(`Removed ${fruit.name}`);

    if (this.hiddenFruitCount() === 0) {
      this.overflowExpanded.set(false);
    }
  }

  reset(): void {
    this.fruits.set([]);
    this.collapseOverflow();

    const inputElement = this.chipInput()?.nativeElement;
    if (inputElement) {
      inputElement.value = '';
    }

    this.announcer.announce('All fruits removed');
  }

  expandOverflow(): void {
    if (this.hiddenFruitCount() === 0) {
      return;
    }

    this.overflowExpanded.set(true);
    this.chipInput()?.nativeElement.focus();
  }

  collapseOverflow(): void {
    this.overflowExpanded.set(false);
  }

  toggleOverflow(): void {
    if (this.overflowExpanded()) {
      this.collapseOverflow();
      return;
    }

    this.expandOverflow();
  }

  handleFieldFocusOut(event: FocusEvent): void {
    const fieldElement = event.currentTarget as HTMLElement | null;
    const nextTarget = event.relatedTarget as Node | null;

    if (fieldElement && nextTarget && fieldElement.contains(nextTarget)) {
      return;
    }

    this.collapseOverflow();
  }
}
