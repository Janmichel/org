import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';

@Component({
  selector: 'org-tooltip-template',
  templateUrl: './tooltip-template.html',
  styleUrl: './tooltip-template.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'org-tooltip-template',
    '[attr.data-testId]': 'testId()'
  }
})
export class OrgTooltipTemplate {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly meta = input('');
  readonly testId = input('org-tooltip-template');

  protected readonly hasEyebrow = computed(() => Boolean(this.eyebrow().trim()));
  protected readonly hasMeta = computed(() => Boolean(this.meta().trim()));
}
