import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrgChip, OrgChipColor } from '@org/ui';

@Component({
  selector: 'app-chip-demo-page',
  imports: [OrgChip],
  templateUrl: './chip-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipDemoPage {
  protected readonly chipColors: readonly OrgChipColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'success',
    'warning',
    'error'
  ];
}
