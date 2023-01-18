import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import {
  Product,
  UpdateProductRequest,
} from 'src/app/types/products/product.type';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-modal-product-form',
  templateUrl: './modal-product-form.component.html',
  styles: [],
})
export class ModalProductFormComponent implements OnInit {
  @Input()
  productInfo!: UpdateProductRequest;
  productForm!: FormGroup;
  errors: string[] = [];
  isModalVisible!: boolean;
  isLoading: boolean = false;
  formText!: [string, string];
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _productsService: ProductsService,
    private readonly _modalService: ModalService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.initForm();

    this._modalService.modalState$.subscribe((visible) => {
      if (this.productInfo) {
        this.formText = ['Update a product', 'Update'];
        this.productForm.controls['name'].setValue(this.productInfo.name);
        this.productForm.controls['price'].setValue(this.productInfo.price);
        this.productForm.controls['stock'].setValue(this.productInfo.stock);
        this.productForm.controls['isAvailable'].setValue(
          this.productInfo.isAvailable
        );
      } else {
        this.formText = ['Add a new product', 'Add'];
      }
      this.isModalVisible = visible;
    });
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0.01, [Validators.required, Validators.min(0.01)]],
      stock: [1, [Validators.required, Validators.min(1)]],
      isAvailable: [],
    });
  }

  hideModal() {
    this._modalService.setModalInvisible();
  }

  isValidForm(): boolean {
    return this.productForm.valid;
  }

  handleProductUpload() {
    if (this.productInfo) {
      this.updateProduct();
    } else {
      this.addNewProduct();
    }
  }

  deleteProduct() {
    this._productsService;
  }

  addNewProduct() {
    this.isLoading = true;
    this._productsService
      .addProduct({ ...this.productForm.value })
      .subscribe((resp) => {
        if (resp.ok === true) {
          this.hideModal();
          this._router.navigate([`/dashboard/product/${resp.data.id}`]);
          this.isLoading = false;
        } else {
          this.errors = resp as unknown as string[];
          this.isLoading = false;
        }
      });
  }

  updateProduct() {
    const { id } = this.productInfo;
    this.isLoading = true;
    this._productsService
      .updateProduct({
        ...this.productForm.value,
        id,
      })
      .subscribe((resp) => {
        console.log(resp);

        if (resp.ok === true) {
          this.hideModal();
          this._router.navigateByUrl('/dashboard/products');
          this.isLoading = false;
        } else {
          this.errors = resp as unknown as string[];
          this.isLoading = false;
        }
      });
  }
}
