import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo'
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./pages/demo/demo-layout').then((m) => m.DemoLayout)
  },
  {
    path: '**',
    redirectTo: 'demo'
  }
];
