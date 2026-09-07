import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  OrgDatepickerAppearance,
  OrgDatepickerMode
} from './datepicker.model';

@Component({
  selector: 'org-datepicker',
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatSuffix,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatStartDate,
    MatEndDate
  ],
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'org-datepicker',
    '[attr.data-mode]': 'mode()',
    '[attr.data-testId]': 'testId()'
  }
})
export class OrgDatepicker {
  readonly mode = input<OrgDatepickerMode>('single');
  readonly appearance = input<OrgDatepickerAppearance>('outline');
  readonly label = input('');
  readonly placeholder = input('');
  readonly startPlaceholder = input('Début');
  readonly endPlaceholder = input('Fin');
  readonly hint = input('');
  readonly disabled = input(false);
  readonly required = input(false);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly testId = input('org-datepicker');

  /** Date unique (mode single). */
  readonly value = model<Date | null>(null);
  /** Début de plage (mode range). */
  readonly start = model<Date | null>(null);
  /** Fin de plage (mode range). */
  readonly end = model<Date | null>(null);

  readonly valueChange = output<Date | null>();
  readonly rangeChange = output<{ start: Date | null; end: Date | null }>();

  protected readonly isRange = computed(() => this.mode() === 'range');
  protected readonly hasLabel = computed(() => Boolean(this.label().trim()));
  protected readonly hasHint = computed(() => Boolean(this.hint().trim()));

  protected onSingleChange(value: Date | null): void {
    this.value.set(value);
    this.valueChange.emit(value);
  }

  protected onStartChange(value: Date | null): void {
    this.start.set(value);
    this.rangeChange.emit({ start: value, end: this.end() });
  }

  protected onEndChange(value: Date | null): void {
    this.end.set(value);
    this.rangeChange.emit({ start: this.start(), end: value });
  }
}
