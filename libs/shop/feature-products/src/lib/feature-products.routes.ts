import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { ShowcaseComponent } from './showcase/showcase.component';

export const featureProductsRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

export const featureTableRoutes: Routes = [
  {
    path: '',
    component: TableExampleComponent
  }
];

export const featureShowcaseRoutes: Routes = [
  {
    path: '',
    component: ShowcaseComponent
  }
];
