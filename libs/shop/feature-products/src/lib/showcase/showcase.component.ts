import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KisInfoBanner, KisInfoBannerType } from '@dms/kis-design-system/info-banner';
import { KisEmptyState } from '@dms/kis-design-system/empty-state';
import { KisButtonModule } from '@dms/kis-design-system/button';
import { KisIcon } from '@dms/kis-design-system/icon';
import { KisDialog } from '@dms/kis-design-system/dialog';
import { KisProgressBar } from '@dms/kis-design-system/progress-bar';
import { KisProgressSpinner } from '@dms/kis-design-system/progress-spinner';
import { KisExpansionPanel } from '@dms/kis-design-system/expansion-panel';
import { KisChipsStatus, IKisChipStatus } from '@dms/kis-design-system/chips';

@Component({
  selector: 'shop-showcase',
  imports: [
    KisInfoBanner,
    KisEmptyState,
    KisButtonModule,
    KisIcon,
    KisDialog,
    KisProgressBar,
    KisProgressSpinner,
    KisExpansionPanel,
    KisChipsStatus
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseComponent {
  readonly bannerTypes: KisInfoBannerType[] = [
    'info',
    'success',
    'warning',
    'error'
  ];

  readonly panelStatus: IKisChipStatus = {
    label: 'Success',
    status: 'success'
  };

  readonly isDialogOpen = signal(false);
  readonly panelExpanded = signal(true);

  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
  }

  confirmDialog(): void {
    this.isDialogOpen.set(false);
  }
}
