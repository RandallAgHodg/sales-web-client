import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/types/products/product.type';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoadingSearch: boolean = false;
  isLoadingProducts: boolean = false;
  searchForm!: FormGroup;
  priceRange: [number, number] = [10, 20];
  constructor(
    private readonly _productService: ProductsService,
    private readonly _formBuilder: FormBuilder
  ) {
    this.searchForm = this.initForm();
  }
  ngOnInit(): void {
    this.isLoadingProducts = true;
    this.getAllProducts();
    this.isLoadingProducts = false;
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe((resp) => {
      this.products = resp;
    });
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      name: [''],
      isAvailable: [false],
    });
  }

  submit() {
    console.log(this.searchForm.value);
  }

  search(e: unknown) {
    console.log('Nya');
    this._productService
      .searchProducts(this.searchForm.value)
      .subscribe((resp) => {
        this.isLoadingProducts = true;
        this.products = resp;
        this.isLoadingProducts = false;
      });
  }
}
