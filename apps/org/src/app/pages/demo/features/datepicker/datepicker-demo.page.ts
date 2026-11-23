import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoDatepicker } from './demo-datepicker';

@Component({
  selector: 'app-datepicker-demo-page',
  imports: [DemoDatepicker],
  templateUrl: './datepicker-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerDemoPage {}
