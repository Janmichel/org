import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { CardGalleryItem } from './card-gallery.model';

@Component({
  selector: 'org-card-gallery-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './card-gallery-dialog.html',
  styleUrl: './card-gallery-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'org-card-gallery-dialog',
    'data-testId': 'org-card-gallery-dialog'
  }
})
export class CardGalleryDialog {
  protected readonly data = inject<CardGalleryItem>(MAT_DIALOG_DATA);
}
