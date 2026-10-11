import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { OrgChip, OrgDatepicker } from '@org/ui';

@Component({
  selector: 'org-overlay-lab-dialog',
  imports: [
    DatePipe,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    OrgChip,
    OrgDatepicker
  ],
  templateUrl: './overlay-lab-dialog.html',
  styleUrl: './overlay-lab-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayLabDialog {
  readonly lastAction = signal('aucune');
  readonly pickedDate = signal<Date | null>(null);

  protected choose(action: string): void {
    this.lastAction.set(action);
  }
}
