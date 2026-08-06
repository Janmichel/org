import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@org/models';
import { ProductCardComponent } from '../product-card/product-card.component';
import { KisEmptyState } from '@dms/kis-design-system/empty-state';

@Component({
  selector: 'shop-product-grid',
  imports: [ProductCardComponent, KisEmptyState],
  template: `
    @if (products().length === 0) {
      <kis-empty-state
        variant="no-results"
        title="No products found"
        description="Try adjusting your search or filter criteria."
        data-testId="shop-no-products"
      />
    } @else {
      <div class="product-grid" role="list">
        @for (product of products(); track product.id) {
          <div class="product-grid__item" role="listitem">
            <shop-product-card
              [product]="product"
              (productClick)="productSelect.emit($event)"
            />
          </div>
        }
      </div>
    }
  `,
  styleUrl: './product-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent {
  readonly products = input.required<Product[]>();
  readonly productSelect = output<Product>();
}
