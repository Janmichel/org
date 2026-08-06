import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@org/shop/data';
import { Product } from '@org/models';
import {
  ErrorMessageComponent,
  LoadingSpinnerComponent
} from '@org/shop/shared-ui';
import { KisButtonModule } from '@dms/kis-design-system/button';
import { KisIcon } from '@dms/kis-design-system/icon';
import { KisDialog } from '@dms/kis-design-system/dialog';
import { KisChipsStatus } from '@dms/kis-design-system/chips';

@Component({
  selector: 'shop-product-detail',
  imports: [
    CurrencyPipe,
    RouterLink,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    KisButtonModule,
    KisIcon,
    KisDialog,
    KisChipsStatus
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  readonly product = signal<Product | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly isDialogOpen = signal(false);

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.error.set('Product ID not provided');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.productsService.getProductById(productId).subscribe({
      next: (product) => {
        if (product) {
          this.product.set(product);
        } else {
          this.error.set('Product not found');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load product details');
        this.loading.set(false);
        console.error('Error loading product:', err);
      }
    });
  }

  getStars(): boolean[] {
    const product = this.product();
    if (!product) {
      return [];
    }

    const rating = product.rating;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return Array(5)
      .fill(false)
      .map((_, index) => {
        if (index < fullStars) {
          return true;
        }
        if (index === fullStars && hasHalfStar) {
          return true;
        }
        return false;
      });
  }

  addToCart(): void {
    this.openDialog();
  }

  confirmAddToCart(): void {
    console.warn('Adding to cart:', this.product()?.id);
    this.closeDialog();
  }

  addToWishlist(): void {
    console.warn('Adding to wishlist:', this.product()?.id);
  }

  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
  }
}
