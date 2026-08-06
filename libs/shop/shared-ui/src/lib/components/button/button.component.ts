import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ShopButtonAppearance = 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';
export type ShopButtonColor = 'primary' | 'accent' | 'warn' | 'basic';
export type ShopButtonIconPosition = 'start' | 'end';
export type ShopButtonSize = 'small' | 'medium' | 'large';
export type ShopButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'shop-button',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.shop-button-host--full-width]': 'fullWidth()',
  },
})
export class ShopButtonComponent {
  readonly label = input<string>('');
  readonly appearance = input<ShopButtonAppearance>('filled');
  readonly color = input<ShopButtonColor>('primary');
  readonly size = input<ShopButtonSize>('medium');
  readonly type = input<ShopButtonType>('button');
  readonly icon = input<string | null>(null);
  readonly iconPosition = input<ShopButtonIconPosition>('start');
  readonly ariaLabel = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly disableRipple = input(false);

  readonly clicked = output<MouseEvent>();

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());
  protected readonly materialColor = computed(() => {
    const color = this.color();

    return color === 'basic' ? null : color;
  });

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
