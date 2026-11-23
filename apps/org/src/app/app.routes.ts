import { Route } from '@angular/router';
import { demoRoutes } from './pages/demo/demo.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo'
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./pages/demo/demo-layout').then((m) => m.DemoLayout),
    children: demoRoutes
  },
  {
    path: '**',
    redirectTo: 'demo'
  }
];
