import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/types/products/product.type';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ModalService } from '../components/modal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  product!: Product;
  errors: string[] = [];
  class: [string, string, string] = ['', '', ''];
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
          this.class = this.product.isAvailable
            ? [
                'flex p-1 border-round align-items-center bg-green-100 text-white ',
                'font-light pl-1',
                'pi pi-thumbs-up text-white text-2xl',
              ]
            : [
                'flex px-8 py-0 align-self-center border-round-xl justify-content-center align-items-center bg-red-100 text-white ',
                'font-light pl-1',
                'pi pi-thumbs-down text-white text-2xl',
              ];
        } else {
          this._router.navigateByUrl('/dashboard/products');
        }
      });
  }

  update() {
    this._modalService.setModalVisible();
  }

  delete() {
    this._productService.deleteProduct(this.product.id).subscribe((resp) => {
      if (resp.ok === true) {
        this._router.navigateByUrl('/dashboard/products');
      } else {
        this.errors = resp as unknown as string[];
      }
    });
  }
}
