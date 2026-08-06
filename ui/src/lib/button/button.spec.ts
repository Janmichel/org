import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the configured label', () => {
    fixture.componentRef.setInput('label', 'Save');
    fixture.detectChanges();

    const button = getButton();

    expect(button.textContent?.trim()).toContain('Save');
    expect(button.type).toBe('button');
  });

  it('should use the configured type, name and value', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('name', 'intent');
    fixture.componentRef.setInput('value', 'save');
    fixture.detectChanges();

    const button = getButton();

    expect(button.type).toBe('submit');
    expect(button.getAttribute('name')).toBe('intent');
    expect(button.getAttribute('value')).toBe('save');
  });

  it('should disable the native button when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(getButton().disabled).toBe(true);
  });

  it('should disable the native button while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = getButton();

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();
  });

  it('should render the configured icon', () => {
    fixture.componentRef.setInput('icon', 'add');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('mat-icon');

    expect(icon?.textContent?.trim()).toBe('add');
  });

  it('should emit clicked when the button is clicked', () => {
    const clicked = vi.fn();
    fixture.componentRef.setInput('label', 'Save');
    fixture.componentInstance.clicked.subscribe(clicked);
    fixture.detectChanges();

    getButton().click();

    expect(clicked).toHaveBeenCalledTimes(1);
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }
});
