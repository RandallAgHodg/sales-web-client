import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BaseResponse } from 'src/app/types/contracts/baseResponse.type';
import {
  Product,
  SearchProductRequest,
} from 'src/app/types/products/product.type';
import { environment } from 'src/environments/environment';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from '../../types/products/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url: string = `${environment.baseUrl}/products`;
  constructor(private readonly _http: HttpClient) {}

  getAllProducts() {
    return this._http.get<BaseResponse<Product[]>>(this.url).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this._http
      .get<BaseResponse<Product>>(url)
      .pipe(catchError((err) => of(err.error.errors)));
  }

  searchProducts(request: SearchProductRequest) {
    const url = `${this.url}/search`;
    return this._http
      .get<BaseResponse<Product[]>>(url, {
        params: {
          ...request,
        },
      })
      .pipe(
        map((resp) => {
          return resp.data;
        })
      );
  }

  addProduct(request: CreateProductRequest) {
    return this._http.post<BaseResponse<Product>>(this.url, request).pipe(
      tap((resp) => console.log(resp)),
      catchError((err) => of(err.error.errors))
    );
  }

  getProductById(id: string) {
    const url = `${this.url}/${id}`;
    return this._http
      .get<BaseResponse<Product>>(url)
      .pipe(catchError((err) => of(err.error.errors)));
  }

  updateProduct(request: UpdateProductRequest) {
    return this._http
      .put<BaseResponse<string>>(`${this.url}/${request.id}`, request)
      .pipe(catchError((err) => of(err.error.errors)));
  }

  deleteProduct(id: string) {
    const url = `${this.url}/${id}`;
    return this._http
      .delete<BaseResponse<string>>(url)
      .pipe(catchError((err) => of(err.error.errors)));
  }
}
