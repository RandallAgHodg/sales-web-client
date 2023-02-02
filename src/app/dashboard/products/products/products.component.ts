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
  constructor(
    private readonly _productService: ProductsService,
    private readonly _formBuilder: FormBuilder
  ) {
    this.searchForm = this.initForm();
  }
  ngOnInit(): void {
    this.isLoadingProducts = true;
    this.getAllProducts();
    setTimeout(() => {
      this.isLoadingProducts = false;
    }, 1000);
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

  getAvailableProducts(e?: unknown) {
    this.isLoadingProducts = true;
    if (
      !this.searchForm.controls['isAvailable'].value &&
      this.searchForm.controls['name'].value === ''
    ) {
      this._productService.getAllProducts().subscribe((resp) => {
        this.products = resp;
      });
    } else {
      if (this.searchForm.controls['name'].value === '') {
        this._productService
          .searchProducts({ ...this.searchForm.value })
          .subscribe((resp) => {
            this.products = resp;
          });
      } else {
        this._productService
          .searchProducts({ ...this.searchForm.value })
          .subscribe((resp) => {
            this.products = resp;
          });
      }
    }
    this.isLoadingProducts = false;
  }

  search(e?: unknown) {
    this.isLoadingProducts = true;

    if (this.searchForm.controls['name'].value === '') {
      this._productService.getAllProducts().subscribe((resp) => {
        this.products = resp;
      });
    } else {
      this._productService
        .searchProducts({ ...this.searchForm.value })
        .subscribe((resp) => {
          this.products = resp;
        });
    }

    this.isLoadingProducts = false;
  }
}
