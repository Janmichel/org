import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ButtonAppearance = 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';
export type ButtonColor = 'primary' | 'accent' | 'warn' | 'basic';
export type ButtonIconPosition = 'start' | 'end';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'lib-button',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-button-host--full-width]': 'fullWidth()',
  },
})
export class Button {
  label = input<string>('');
  appearance = input<ButtonAppearance>('filled');
  color = input<ButtonColor>('primary');
  size = input<ButtonSize>('medium');
  type = input<ButtonType>('button');
  icon = input<string | null>(null);
  iconPosition = input<ButtonIconPosition>('start');
  ariaLabel = input<string | null>(null);
  name = input<string | null>(null);
  value = input<string | null>(null);
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  disableRipple = input<boolean>(false);

  clicked = output<MouseEvent>();

  protected isDisabled = computed(() => this.disabled() || this.loading());
  protected materialColor = computed(() => {
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
