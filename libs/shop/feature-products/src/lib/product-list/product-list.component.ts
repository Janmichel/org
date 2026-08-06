import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from '@org/shop/data';
import { Product, ProductFilter } from '@org/models';
import {
  ErrorMessageComponent,
  LoadingSpinnerComponent,
  ProductGridComponent
} from '@org/shop/shared-ui';
import { KisChips } from '@dms/kis-design-system/chips';
import { KisFormField, KisFormFieldBar } from '@dms/kis-design-system/form-field';
import { KisSearchBar } from '@dms/kis-design-system/search-bar';
import { KisSelect } from '@dms/kis-design-system/select';
import { KisCheckbox } from '@dms/kis-design-system/checkbox';
import { KisPaginator } from '@dms/kis-design-system/paginator';
import { PageEvent } from '@angular/material/paginator';

interface CategoryOption {
  id: string;
  name: string;
}

@Component({
  selector: 'shop-product-list',
  imports: [
    ReactiveFormsModule,
    ProductGridComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    KisChips,
    KisFormFieldBar,
    KisSearchBar,
    KisFormField,
    KisSelect,
    KisCheckbox,
    KisPaginator
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly pageSize = 12;

  readonly products = signal<Product[]>([]);
  readonly totalProducts = signal(0);
  readonly currentPage = signal(1);
  readonly totalPages = signal(0);
  readonly categories = signal<string[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly categoryControl = new FormControl('', { nonNullable: true });
  readonly inStockControl = new FormControl(false, { nonNullable: true });

  readonly hasMorePages = computed(() => this.totalPages() > 1);

  readonly categorySelectOptions = computed<CategoryOption[]>(() => [
    { id: '', name: 'All categories' },
    ...this.categories().map((category) => ({ id: category, name: category }))
  ]);

  readonly categoryChipOptions = computed(() =>
    this.categories()
      .slice(0, 6)
      .map((category) => ({ id: category, label: category }))
  );

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadProducts();
      });

    this.categoryControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadProducts();
      });

    this.inStockControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadProducts();
      });

    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    const filter: ProductFilter = {};
    const searchTerm = this.searchControl.value.trim();

    if (searchTerm) {
      filter.searchTerm = searchTerm;
    }

    const category = this.categoryControl.value;
    if (category) {
      filter.category = category;
    }

    if (this.inStockControl.value) {
      filter.inStock = true;
    }

    this.productsService.getProducts(filter, this.currentPage(), this.pageSize).subscribe({
      next: (response) => {
        this.products.set(response.items);
        this.totalProducts.set(response.total);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
        console.error('Error loading products:', err);
      }
    });
  }

  onProductSelect(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.loadProducts();
  }
}
