import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  inject,
  signal
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { OrgChip } from '@org/ui';
import { OverlayLabDialog } from './overlay-lab-dialog';
import { overlayLabOverlayDefaults } from './overlay-lab.providers';
import { ShadowOverlayContainer } from './shadow-overlay-container';

@Component({
  selector: 'org-overlay-lab-host',
  imports: [MatButton, OrgChip],
  templateUrl: './overlay-lab.html',
  styleUrl: './overlay-lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'org-overlay-lab-host',
    'data-testId': 'org-overlay-lab-host'
  }
})
export class OverlayLab {
  private readonly dialog = inject(MatDialog);
  private readonly overlayContainer = inject(ShadowOverlayContainer);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly isolated = signal(true);

  constructor() {
    this.overlayContainer.attach(this.host.nativeElement);
  }

  protected setIsolated(isolated: boolean): void {
    this.dialog.closeAll();
    this.isolated.set(isolated);
    // Un <dialog> hôte est en top layer : sans popover, le body passe derrière.
    overlayLabOverlayDefaults.usePopover = !isolated;
    if (isolated) {
      this.overlayContainer.attach(this.host.nativeElement);
      return;
    }
    this.overlayContainer.useDocumentBody();
  }

  protected openDialog(): void {
    this.dialog.open(OverlayLabDialog, {
      width: '32rem',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      panelClass: 'org-overlay-lab-dialog-pane'
    });
  }
}
