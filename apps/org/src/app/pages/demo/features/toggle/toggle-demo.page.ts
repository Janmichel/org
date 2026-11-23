import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toggle-demo-page',
  imports: [MatSlideToggleModule],
  templateUrl: './toggle-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleDemoPage {}
