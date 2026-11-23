import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DemoCalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isFocused: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  hasIndicator: boolean;
}

@Component({
  selector: 'app-demo-calendar',
  imports: [DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './demo-calendar.html',
  styleUrl: './demo-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCalendar {
  private readonly indicatorDay = 18;

  protected readonly weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  protected readonly viewDate = signal(new Date(2023, 3, 1));
  protected readonly rangeStart = signal<Date | null>(new Date(2023, 3, 25));
  protected readonly rangeEnd = signal<Date | null>(new Date(2023, 3, 29));
  protected readonly focusedDate = signal(new Date(2023, 3, 24));

  protected readonly monthLabel = computed(() => {
    const label = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(this.viewDate());
    return label;
  });

  protected readonly days = computed(() => this.buildDays());

  protected readonly weeks = computed(() => {
    const days = this.days();
    const rows: DemoCalendarDay[][] = [];
    for (let index = 0; index < days.length; index += 7) {
      rows.push(days.slice(index, index + 7));
    }
    return rows;
  });

  protected readonly rangeLabel = computed(() => {
    const start = this.rangeStart();
    const end = this.rangeEnd();
    if (!start) {
      return 'Aucune date sélectionnée';
    }
    const formatter = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    if (!end || this.isSameDay(start, end)) {
      return `Date sélectionnée : ${formatter.format(start)}`;
    }
    return `Plage sélectionnée : du ${formatter.format(start)} au ${formatter.format(end)}`;
  });

  previousMonth(): void {
    this.viewDate.update(
      (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }

  nextMonth(): void {
    this.viewDate.update(
      (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1)
    );
  }

  selectDay(day: DemoCalendarDay): void {
    this.focusedDate.set(day.date);
    const start = this.rangeStart();
    const end = this.rangeEnd();

    if (!start || (start && end)) {
      this.rangeStart.set(day.date);
      this.rangeEnd.set(null);
      return;
    }

    if (this.startOfDay(day.date) < this.startOfDay(start)) {
      this.rangeEnd.set(start);
      this.rangeStart.set(day.date);
      return;
    }

    this.rangeEnd.set(day.date);
  }

  applySelection(): void {
    if (!this.rangeStart()) {
      return;
    }
    if (!this.rangeEnd()) {
      this.rangeEnd.set(this.rangeStart());
    }
  }

  cancelSelection(): void {
    this.rangeStart.set(new Date(2023, 3, 25));
    this.rangeEnd.set(new Date(2023, 3, 29));
    this.focusedDate.set(new Date(2023, 3, 24));
    this.viewDate.set(new Date(2023, 3, 1));
  }

  private buildDays(): DemoCalendarDay[] {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());
    const start = this.rangeStart();
    const end = this.rangeEnd();
    const focused = this.focusedDate();
    const days: DemoCalendarDay[] = [];

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index
      );
      const isCurrentMonth = date.getMonth() === month;
      const isStart = !!start && this.isSameDay(date, start);
      const isEnd = !!end && this.isSameDay(date, end);
      const isInRange =
        !!start &&
        !!end &&
        this.startOfDay(date) > this.startOfDay(start) &&
        this.startOfDay(date) < this.startOfDay(end);

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isFocused: this.isSameDay(date, focused),
        isRangeStart: isStart,
        isRangeEnd: isEnd,
        isInRange,
        hasIndicator: isCurrentMonth && date.getDate() === this.indicatorDay
      });
    }

    return days;
  }

  private isSameDay(left: Date, right: Date): boolean {
    return this.startOfDay(left) === this.startOfDay(right);
  }

  private startOfDay(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  }
}
