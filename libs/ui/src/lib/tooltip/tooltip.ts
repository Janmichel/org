import {
  ConnectedPosition,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  input,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ORG_TOOLTIP_DATA } from './tooltip-data';
import { OrgTooltipPanel } from './tooltip-panel';
import {
  OrgTooltipAnimation,
  OrgTooltipColor,
  OrgTooltipPosition
} from './tooltip.model';
import { OrgTooltipRichContent } from './tooltip-template.model';

const POSITION_MAP: Record<OrgTooltipPosition, ConnectedPosition[]> = {
  above: [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -8
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8
    }
  ],
  below: [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -8
    }
  ],
  left: [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8
    },
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8
    }
  ],
  right: [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8
    }
  ],
  before: [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8
    }
  ],
  after: [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8
    }
  ]
};

/**
 * Tooltip design system — directive adaptable à tout déclencheur
 * (chip, bouton, icône, texte, etc.).
 *
 * @example
 * ```html
 * <button
 *   orgTooltip="Enregistrer"
 *   orgTooltipColor="primary"
 *   orgTooltipAnimation="scale"
 * >Save</button>
 *
 * <button
 *   orgTooltip
 *   [orgTooltipRich]="{
 *     eyebrow: 'Sync cloud',
 *     title: 'Dernière sync',
 *     meta: 'Il y a 2 minutes · 14 fichiers'
 *   }"
 *   orgTooltipColor="primary"
 * >Détails</button>
 *
 * <button [orgTooltipContent]="details">Custom</button>
 * <ng-template #details>
 *   <org-tooltip-template title="Custom" meta="…" />
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[orgTooltip]',
  exportAs: 'orgTooltip',
  host: {
    class: 'org-tooltip-host',
    '[attr.data-testId]': 'testId()',
    '[attr.aria-describedby]': 'describedById',
    '(mouseenter)': 'onShow()',
    '(mouseleave)': 'onHide()',
    '(focus)': 'onShow()',
    '(blur)': 'onHide()',
    '(keydown.escape)': 'hide(0)'
  }
})
export class OrgTooltip implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly overlay = inject(Overlay);
  private readonly positionBuilder = inject(OverlayPositionBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly environmentInjector = inject(EnvironmentInjector);

  private overlayRef: OverlayRef | null = null;
  private showTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private hideTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private panelId = `org-tooltip-${Math.random().toString(36).slice(2, 9)}`;
  protected describedById: string | null = null;

  /** Message texte simple (ignoré si `orgTooltipRich` est fourni). */
  readonly orgTooltip = input('');
  /** Contenu custom via TemplateRef. */
  readonly orgTooltipContent = input<TemplateRef<unknown> | null>(null);
  /** Template structuré eyebrow / title / meta. */
  readonly orgTooltipRich = input<OrgTooltipRichContent | null>(null);
  readonly orgTooltipPosition = input<OrgTooltipPosition>('above');
  readonly orgTooltipColor = input<OrgTooltipColor>('inverse');
  readonly orgTooltipAnimation = input<OrgTooltipAnimation>('fade');
  readonly orgTooltipDisabled = input(false);
  readonly orgTooltipShowDelay = input(200);
  readonly orgTooltipHideDelay = input(0);
  readonly testId = input('org-tooltip');

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  protected onShow(): void {
    if (this.orgTooltipDisabled() || !this.hasPayload()) {
      return;
    }
    this.clearHideTimer();
    this.clearShowTimer();
    this.showTimeoutId = setTimeout(
      () => this.show(0),
      Math.max(0, this.orgTooltipShowDelay())
    );
  }

  protected onHide(): void {
    this.clearShowTimer();
    this.clearHideTimer();
    this.hideTimeoutId = setTimeout(
      () => this.hide(0),
      Math.max(0, this.orgTooltipHideDelay())
    );
  }

  show(delay = 0): void {
    if (this.orgTooltipDisabled() || !this.hasPayload()) {
      return;
    }

    this.clearShowTimer();
    this.clearHideTimer();

    if (delay > 0) {
      this.showTimeoutId = setTimeout(() => this.attachPanel(), delay);
      return;
    }

    this.attachPanel();
  }

  hide(delay = 0): void {
    this.clearShowTimer();
    this.clearHideTimer();

    if (delay > 0) {
      this.hideTimeoutId = setTimeout(() => this.detachPanel(), delay);
      return;
    }

    this.detachPanel();
  }

  toggle(): void {
    if (this.overlayRef?.hasAttached()) {
      this.hide(0);
      return;
    }
    this.show(0);
  }

  private hasPayload(): boolean {
    return Boolean(
      this.orgTooltipRich()?.title ||
        this.orgTooltip().trim() ||
        this.orgTooltipContent()
    );
  }

  private attachPanel(): void {
    if (this.overlayRef?.hasAttached()) {
      this.patchPanel();
      return;
    }

    const position = this.orgTooltipPosition();
    const strategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions(POSITION_MAP[position] ?? POSITION_MAP.above);

    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'org-tooltip-overlay'
    });

    this.overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.describedById = null;
      });

    const injector = Injector.create({
      parent: this.environmentInjector,
      providers: [
        {
          provide: ORG_TOOLTIP_DATA,
          useValue: {
            message: this.orgTooltip(),
            content: this.orgTooltipContent(),
            rich: this.orgTooltipRich(),
            color: this.orgTooltipColor(),
            animation: this.orgTooltipAnimation(),
            testId: `${this.testId()}-panel`,
            panelId: this.panelId
          }
        }
      ]
    });

    const portal = new ComponentPortal(OrgTooltipPanel, null, injector);
    this.overlayRef.attach(portal);
    this.describedById = this.panelId;
  }

  private patchPanel(): void {
    // Already open — recreate to refresh inputs/animation cleanly.
    this.detachPanel();
    this.attachPanel();
  }

  private detachPanel(): void {
    this.describedById = null;
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private dispose(): void {
    this.clearShowTimer();
    this.clearHideTimer();
    this.detachPanel();
  }

  private clearShowTimer(): void {
    if (this.showTimeoutId !== null) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  private clearHideTimer(): void {
    if (this.hideTimeoutId !== null) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }
  }
}
