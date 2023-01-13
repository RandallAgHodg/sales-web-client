import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/types/products/product.type';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private readonly _productService: ProductsService) {}
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
}
