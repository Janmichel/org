import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-demo-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemoPage {
  protected readonly buttonShapes = ['square', 'rounded'] as const;
  protected readonly buttonVariants = ['filled', 'tonal', 'outlined'] as const;
}
