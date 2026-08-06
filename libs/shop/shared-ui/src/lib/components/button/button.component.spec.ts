import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopButtonComponent } from './button.component';

describe('ShopButtonComponent', () => {
  let fixture: ComponentFixture<ShopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopButtonComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the configured label', () => {
    fixture.componentRef.setInput('label', 'Save');
    fixture.detectChanges();

    expect(getButton().textContent?.trim()).toContain('Save');
  });

  it('should disable while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(getButton().disabled).toBe(true);
    expect(getButton().getAttribute('aria-busy')).toBe('true');
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();
  });

  it('should emit clicked when clicked', () => {
    const clicked = vi.fn();

    fixture.componentInstance.clicked.subscribe(clicked);
    getButton().click();

    expect(clicked).toHaveBeenCalledTimes(1);
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }
});
