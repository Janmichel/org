import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@org/models';
import { KisChipsStatus } from '@dms/kis-design-system/chips';

@Component({
  selector: 'shop-product-card',
  imports: [CurrencyPipe, KisChipsStatus],
  template: `
    <article
      class="product-card"
      [class.product-card--out-of-stock]="!product().inStock"
      tabindex="0"
      role="button"
      [attr.aria-label]="'View details for ' + product().name"
      [attr.data-testId]="'product-card-' + product().id"
      (click)="productClick.emit(product())"
      (keyup.enter)="productClick.emit(product())"
      (keyup.space)="productClick.emit(product()); $event.preventDefault()"
    >
      <div class="product-card__media">
        <img
          class="product-card__image"
          [src]="product().imageUrl"
          [alt]="product().name"
          loading="lazy"
        />
        <kis-chips-status
          class="product-card__badge"
          [options]="[
            {
              label: product().inStock ? 'In stock' : 'Out of stock',
              status: product().inStock ? 'success' : 'error',
              iconHidden: true
            }
          ]"
        />
      </div>

      <div class="product-card__body">
        <p class="product-card__category">{{ product().category }}</p>
        <h3 class="product-card__title">{{ product().name }}</h3>
        <p class="product-card__rating">
          {{ product().rating }} / 5
          <span>({{ product().reviewCount }} reviews)</span>
        </p>
        <p class="product-card__price">{{ product().price | currency }}</p>
      </div>
    </article>
  `,
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly productClick = output<Product>();
}
