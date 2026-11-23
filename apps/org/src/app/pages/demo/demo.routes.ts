import { Route } from '@angular/router';

export const demoRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'card' },
  {
    path: 'card',
    loadComponent: () =>
      import('./features/card/card-demo.page').then((m) => m.CardDemoPage)
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/calendar-demo.page').then(
        (m) => m.CalendarDemoPage
      )
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./features/button/button-demo.page').then((m) => m.ButtonDemoPage)
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./features/checkbox/checkbox-demo.page').then(
        (m) => m.CheckboxDemoPage
      )
  },
  {
    path: 'toggle',
    loadComponent: () =>
      import('./features/toggle/toggle-demo.page').then((m) => m.ToggleDemoPage)
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./features/table/table-demo.page').then((m) => m.TableDemoPage)
  },
  {
    path: 'chip',
    loadComponent: () =>
      import('./features/chip/chip-demo.page').then((m) => m.ChipDemoPage)
  },
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./features/tooltip/tooltip-demo.page').then(
        (m) => m.TooltipDemoPage
      )
  },
  {
    path: 'popover',
    loadComponent: () =>
      import('./features/popover/popover-demo.page').then(
        (m) => m.PopoverDemoPage
      )
  },
  {
    path: 'datepicker',
    loadComponent: () =>
      import('./features/datepicker/datepicker-demo.page').then(
        (m) => m.DatepickerDemoPage
      )
  },
  {
    path: 'org-card',
    loadComponent: () =>
      import('./features/org-card/org-card-demo.page').then(
        (m) => m.OrgCardDemoPage
      )
  },
  {
    path: 'card-gallery',
    loadComponent: () =>
      import('./features/card-gallery/card-gallery-demo.page').then(
        (m) => m.CardGalleryDemoPage
      )
  }
];
