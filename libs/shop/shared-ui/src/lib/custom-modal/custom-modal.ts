import { MatButton } from '@angular/material/button';
import { Component, input, output } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  content: string;
}

@Component({
  selector: 'app-ui-custom-modal',
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './custom-modal.html',
  styleUrl: './custom-modal.scss',
})
export class CustomModal {
  title = input('Dialog title');
  cancelLabel = input('Cancel');
  confirmLabel = input('Confirm');

  confirm = output<void>();
}
