import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/types/products/product.type';
import { ProductsService } from '../products.service';
import { ModalService } from '../../components/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  product!: Product;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _productService: ProductsService,
    private readonly _modalService: ModalService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this._productService.getProductById(id);
        })
      )
      .subscribe((resp) => {
        if (resp.ok === true) {
          this.product = resp.data;
        } else {
          this._router.navigateByUrl('/dashboard/products');
        }
      });
  }

  update() {
    this._modalService.setModalVisible();
  }
}
