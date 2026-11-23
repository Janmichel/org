import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCalendar } from './demo-calendar';

@Component({
  selector: 'app-calendar-demo-page',
  imports: [DemoCalendar],
  templateUrl: './calendar-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDemoPage {}
