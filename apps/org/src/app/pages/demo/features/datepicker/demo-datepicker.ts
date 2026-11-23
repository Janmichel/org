import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrgDatepicker } from '@org/ui';

@Component({
  selector: 'app-demo-datepicker',
  imports: [OrgDatepicker, DatePipe],
  templateUrl: './demo-datepicker.html',
  styleUrl: './demo-datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDatepicker {
  readonly single = signal<Date | null>(null);
  readonly rangeStart = signal<Date | null>(null);
  readonly rangeEnd = signal<Date | null>(null);
  readonly minDate = new Date(2020, 0, 1);
  readonly maxDate = new Date(2030, 11, 31);
}
