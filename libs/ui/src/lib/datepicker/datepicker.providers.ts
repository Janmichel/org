import { Provider } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from '@angular/material/core';

/** Providers datepicker (adapter natif + locale FR). */
export function provideOrgDatepicker(locale = 'fr-FR'): Provider[] {
  return [
    { provide: MAT_DATE_LOCALE, useValue: locale },
    ...provideNativeDateAdapter()
  ];
}
