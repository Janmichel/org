import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chips } from './chips';

describe('Chips', () => {
  let component: Chips;
  let fixture: ComponentFixture<Chips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chips],
    }).compileComponents();

    fixture = TestBed.createComponent(Chips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display four chips and group the remaining chips', () => {
    component.fruits.set([
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Pear' },
      { name: 'Peach' },
      { name: 'Cherry' },
    ]);

    expect(component.visibleFruits()).toHaveLength(4);
    expect(component.hiddenFruits()).toHaveLength(3);
    expect(component.hiddenFruitCount()).toBe(3);
  });

  it('should expand and collapse the hidden chips', () => {
    component.fruits.set([
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Pear' },
      { name: 'Peach' },
    ]);

    component.expandOverflow();
    expect(component.overflowExpanded()).toBe(true);

    component.collapseOverflow();
    expect(component.overflowExpanded()).toBe(false);
  });

  it('should support toggling hidden chips', () => {
    component.fruits.set([
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Pear' },
    ]);

    component.toggleOverflow();
    expect(component.overflowExpanded()).toBe(true);

    component.toggleOverflow();
    expect(component.overflowExpanded()).toBe(false);
  });

  it('should replace the counter until focus leaves the field', () => {
    component.fruits.set([
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Pear' },
      { name: 'Peach' },
      { name: 'Cherry' },
    ]);
    fixture.detectChanges();

    const chipGrid = fixture.nativeElement.querySelector('mat-chip-grid');
    const overflowButton = fixture.nativeElement.querySelector(
      '.chips-overflow-button',
    ) as HTMLElement;

    expect(chipGrid.querySelector('.chips-input')).toBeTruthy();
    expect(overflowButton.textContent).toContain('+3');
    expect(chipGrid.querySelectorAll('.chips-expanded-chip')).toHaveLength(0);

    overflowButton.click();
    fixture.detectChanges();

    expect(chipGrid.querySelectorAll('.chips-expanded-chip')).toHaveLength(3);
    expect(chipGrid.querySelector('.chips-overflow-trigger')).toBeNull();

    const chipInput = chipGrid.querySelector(
      '.chips-input',
    ) as HTMLInputElement;
    const resetButton = fixture.nativeElement.querySelector(
      '[aria-label="Reset fruits"]',
    ) as HTMLButtonElement;
    chipInput.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: resetButton,
      }),
    );
    fixture.detectChanges();

    expect(chipGrid.querySelectorAll('.chips-expanded-chip')).toHaveLength(3);

    const outsideButton = document.createElement('button');
    fixture.nativeElement.appendChild(outsideButton);
    chipInput.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: outsideButton,
      }),
    );
    fixture.detectChanges();

    expect(chipGrid.querySelectorAll('.chips-expanded-chip')).toHaveLength(0);
    expect(
      chipGrid.querySelector('.chips-overflow-trigger')?.textContent,
    ).toContain('+3');
  });

  it('should reset all chips and clear the input', () => {
    fixture.detectChanges();
    const chipInput = fixture.nativeElement.querySelector(
      '.chips-input',
    ) as HTMLInputElement;
    const resetButton = fixture.nativeElement.querySelector(
      '[aria-label="Reset fruits"]',
    ) as HTMLButtonElement;
    chipInput.value = 'Peach';

    resetButton.click();
    fixture.detectChanges();

    expect(component.fruits()).toEqual([]);
    expect(chipInput.value).toBe('');
    expect(
      fixture.nativeElement.querySelector('[aria-label="Reset fruits"]'),
    ).toBeNull();
  });

  it('should keep hidden chips expanded when one is removed', () => {
    component.fruits.set([
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Pear' },
      { name: 'Peach' },
      { name: 'Cherry' },
    ]);
    component.expandOverflow();
    fixture.detectChanges();

    const chipInput = fixture.nativeElement.querySelector(
      '.chips-input',
    ) as HTMLInputElement;
    const hiddenRemoveButton = fixture.nativeElement.querySelector(
      '.chips-expanded-chip [matChipRemove]',
    ) as HTMLButtonElement;
    chipInput.focus();

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    hiddenRemoveButton.dispatchEvent(mouseDownEvent);
    hiddenRemoveButton.click();
    fixture.detectChanges();

    expect(mouseDownEvent.defaultPrevented).toBe(true);
    expect(component.overflowExpanded()).toBe(true);
    expect(component.hiddenFruitCount()).toBe(2);
    expect(
      fixture.nativeElement.querySelectorAll('.chips-expanded-chip'),
    ).toHaveLength(2);
  });
});
