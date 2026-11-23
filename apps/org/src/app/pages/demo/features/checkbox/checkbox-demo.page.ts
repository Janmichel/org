import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox-demo-page',
  imports: [FormsModule, MatCheckboxModule],
  templateUrl: './checkbox-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxDemoPage {}
