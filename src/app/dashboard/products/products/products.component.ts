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
  searchForm!: FormGroup;
  priceRange!: [number, number];
  constructor(
    private readonly _productService: ProductsService,
    private readonly _formBuilder: FormBuilder
  ) {
    this.searchForm = this.initForm();
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe((resp) => {
      this.products = resp;
      console.log(JSON.stringify(resp) + 'AAAA');
    });
    console.log(this.products);
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      query: [''],
      priceRange: [[,]],
      isActive: [true],
    });
  }

  onChange(e: any) {
    this.priceRange = this.searchForm.get('priceRange')?.value as unknown as [
      number,
      number
    ];
  }
}
