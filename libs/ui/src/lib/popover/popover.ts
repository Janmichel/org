import {
  ConnectedPosition,
  ConnectionPositionPair,
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
  computed,
  inject,
  Injector,
  input,
  OnDestroy,
  output,
  signal,
  TemplateRef
} from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ORG_POPOVER_DATA, OrgPopoverArrow } from './popover-data';
import {
  OrgPopoverColor,
  OrgPopoverPosition,
  OrgPopoverTrigger
} from './popover.model';
import { OrgPopoverPanel } from './popover-panel';

const POSITION_MAP: Record<OrgPopoverPosition, ConnectedPosition[]> = {
  above: [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -12
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 12
    }
  ],
  below: [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 12
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -12
    }
  ],
  left: [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -12
    },
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 12
    }
  ],
  right: [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 12
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -12
    }
  ],
  before: [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -12
    }
  ],
  after: [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 12
    }
  ]
};

function arrowFromPosition(position: OrgPopoverPosition): OrgPopoverArrow {
  if (position === 'above') {
    return 'bottom';
  }
  if (position === 'left' || position === 'before') {
    return 'right';
  }
  if (position === 'right' || position === 'after') {
    return 'left';
  }
  return 'top';
}

function arrowFromPair(pair: ConnectionPositionPair): OrgPopoverArrow {
  if (pair.originY === 'bottom' && pair.overlayY === 'top') {
    return 'top';
  }
  if (pair.originY === 'top' && pair.overlayY === 'bottom') {
    return 'bottom';
  }
  if (pair.originX === 'end' && pair.overlayX === 'start') {
    return 'left';
  }
  if (pair.originX === 'start' && pair.overlayX === 'end') {
    return 'right';
  }
  return 'top';
}

/**
 * Popover interactif — clic ou hover, flèche, sans backdrop par défaut.
 *
 * @example
 * ```html
 * <!-- Clic -->
 * <button [orgPopover]="formTpl" orgPopoverTitle="Invite">Ouvrir</button>
 *
 * <!-- Hover -->
 * <button
 *   [orgPopover]="formTpl"
 *   orgPopoverTrigger="hover"
 *   orgPopoverPosition="below"
 * >Survole-moi</button>
 * ```
 */
@Directive({
  selector: '[orgPopover]',
  exportAs: 'orgPopover',
  host: {
    class: 'org-popover-host',
    '[class.org-popover-host--hover]': 'isHoverTrigger()',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-controls]': 'isOpen() ? panelId : null',
    '[attr.data-testId]': 'testId()',
    '(click)': 'onTriggerClick($event)',
    '(mouseenter)': 'onTriggerEnter()',
    '(mouseleave)': 'onTriggerLeave()',
    '(focus)': 'onTriggerEnter()',
    '(blur)': 'onTriggerLeave()'
  }
})
export class OrgPopover implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly overlay = inject(Overlay);
  private readonly positionBuilder = inject(OverlayPositionBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly environmentInjector = inject(EnvironmentInjector);

  private overlayRef: OverlayRef | null = null;
  private readonly panelClosed$ = new Subject<void>();
  private ignoreOutsideUntil = 0;
  private showTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private hideTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private panelPointerInside = false;
  protected readonly panelId = `org-popover-${Math.random().toString(36).slice(2, 9)}`;
  protected readonly isOpen = signal(false);

  readonly orgPopover = input.required<TemplateRef<unknown>>();
  readonly orgPopoverTitle = input('');
  readonly orgPopoverPosition = input<OrgPopoverPosition>('below');
  readonly orgPopoverColor = input<OrgPopoverColor>('surface');
  readonly orgPopoverTrigger = input<OrgPopoverTrigger>('click');
  readonly orgPopoverShowDelay = input(150);
  readonly orgPopoverHideDelay = input(180);
  readonly orgPopoverHasBackdrop = input(false);
  readonly orgPopoverArrow = input(true);
  readonly testId = input('org-popover');

  readonly opened = output<void>();
  readonly closed = output<void>();

  protected readonly isHoverTrigger = computed(
    () => this.orgPopoverTrigger() === 'hover'
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  protected onTriggerClick(event: MouseEvent): void {
    if (this.orgPopoverTrigger() !== 'click') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  protected onTriggerEnter(): void {
    if (this.orgPopoverTrigger() !== 'hover') {
      return;
    }
    this.clearHideTimer();
    this.scheduleShow();
  }

  protected onTriggerLeave(): void {
    if (this.orgPopoverTrigger() !== 'hover') {
      return;
    }
    this.clearShowTimer();
    this.scheduleHide();
  }

  toggle(): void {
    if (this.isOpen()) {
      this.hide();
      return;
    }
    this.show();
  }

  show(delay = 0): void {
    this.clearHideTimer();
    this.clearShowTimer();
    if (this.isOpen()) {
      return;
    }
    if (delay > 0) {
      this.showTimeoutId = setTimeout(() => this.attachPanel(), delay);
      return;
    }
    this.attachPanel();
  }

  hide(delay = 0): void {
    this.clearShowTimer();
    this.clearHideTimer();
    if (!this.isOpen()) {
      return;
    }
    if (delay > 0) {
      this.hideTimeoutId = setTimeout(() => {
        if (!this.panelPointerInside) {
          this.detachPanel();
        }
      }, delay);
      return;
    }
    this.detachPanel();
  }

  private scheduleShow(): void {
    this.show(Math.max(0, this.orgPopoverShowDelay()));
  }

  private scheduleHide(): void {
    this.hide(Math.max(0, this.orgPopoverHideDelay()));
  }

  private attachPanel(): void {
    const position = this.orgPopoverPosition();
    const isHover = this.orgPopoverTrigger() === 'hover';
    const strategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withPositions(POSITION_MAP[position] ?? POSITION_MAP.below);

    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: !isHover && this.orgPopoverHasBackdrop(),
      backdropClass: 'org-popover-backdrop',
      panelClass: 'org-popover-overlay'
    });

    if (isHover) {
      const pane = this.overlayRef.overlayElement;
      const onEnter = (): void => {
        this.panelPointerInside = true;
        this.clearHideTimer();
      };
      const onLeave = (): void => {
        this.panelPointerInside = false;
        this.scheduleHide();
      };
      pane.addEventListener('mouseenter', onEnter);
      pane.addEventListener('mouseleave', onLeave);
      this.panelClosed$.pipe(take(1)).subscribe(() => {
        pane.removeEventListener('mouseenter', onEnter);
        pane.removeEventListener('mouseleave', onLeave);
      });
    } else if (this.orgPopoverHasBackdrop()) {
      this.overlayRef
        .backdropClick()
        .pipe(takeUntil(this.panelClosed$))
        .subscribe(() => this.hide());
    } else {
      this.ignoreOutsideUntil = Date.now() + 120;
      this.overlayRef
        .outsidePointerEvents()
        .pipe(takeUntil(this.panelClosed$))
        .subscribe((event) => {
          if (Date.now() < this.ignoreOutsideUntil) {
            return;
          }
          const target = event.target as Node | null;
          if (target && this.elementRef.nativeElement.contains(target)) {
            return;
          }
          this.hide();
        });
    }

    this.overlayRef
      .keydownEvents()
      .pipe(takeUntil(this.panelClosed$))
      .subscribe((event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          this.hide();
        }
      });

    const injector = Injector.create({
      parent: this.environmentInjector,
      providers: [
        {
          provide: ORG_POPOVER_DATA,
          useValue: {
            content: this.orgPopover(),
            color: this.orgPopoverColor(),
            title: this.orgPopoverTitle(),
            arrow: arrowFromPosition(position),
            showArrow: this.orgPopoverArrow(),
            autoCaptureFocus: !isHover,
            testId: `${this.testId()}-panel`,
            panelId: this.panelId,
            close: () => this.hide()
          }
        }
      ]
    });

    const portal = new ComponentPortal(OrgPopoverPanel, null, injector);
    const ref = this.overlayRef.attach(portal);

    strategy.positionChanges
      .pipe(takeUntil(this.panelClosed$))
      .subscribe((change) => {
        ref.instance.setArrow(arrowFromPair(change.connectionPair));
      });

    this.isOpen.set(true);
    this.opened.emit();
  }

  private detachPanel(): void {
    this.panelPointerInside = false;
    this.panelClosed$.next();
    this.overlayRef?.dispose();
    this.overlayRef = null;
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.closed.emit();
    }
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

  private dispose(): void {
    this.clearShowTimer();
    this.clearHideTimer();
    this.detachPanel();
    this.panelClosed$.complete();
  }
}
