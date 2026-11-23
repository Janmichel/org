import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { OrgChip, OrgPopover } from '@org/ui';

@Component({
  selector: 'app-popover-demo-page',
  imports: [FormsModule, MatButtonModule, OrgChip, OrgPopover],
  templateUrl: './popover-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverDemoPage {
  protected readonly inviteEmail = signal('');
  protected readonly inviteRole = signal('viewer');
  protected readonly inviteSent = signal(false);

  protected readonly projectForm = {
    name: signal('Design system Q3'),
    client: signal('JCDecaux'),
    owner: signal('Olivia Quinn'),
    email: signal('olivia@studio.com'),
    phone: signal('+33 6 12 34 56 78'),
    team: signal('product'),
    priority: signal('high'),
    startDate: signal('2026-09-01'),
    endDate: signal('2026-12-15'),
    budget: signal('42000'),
    notifyEmail: signal(true),
    notifySlack: signal(true),
    notifyDigest: signal(false),
    publicLink: signal(false),
    description: signal(
      'Refonte des overlays (tooltip, popover) et validation accessibilité WCAG AA.'
    ),
    notes: signal('')
  };

  protected readonly projectSaved = signal(false);

  protected submitInvite(popover: OrgPopover): void {
    if (!this.inviteEmail().trim()) {
      return;
    }
    this.inviteSent.set(true);
    popover.hide();
  }

  protected submitProject(popover: OrgPopover): void {
    if (!this.projectForm.name().trim()) {
      return;
    }
    this.projectSaved.set(true);
    popover.hide();
  }
}
