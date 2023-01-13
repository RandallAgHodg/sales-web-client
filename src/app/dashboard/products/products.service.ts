import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseResponse } from 'src/app/types/contracts/baseResponse.type';
import { Product } from 'src/app/types/products/product.type';
import { environment } from 'src/environments/environment';

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
    this.url = `${this.url}/${id}`;
    return this._http
      .get<BaseResponse<Product>>(this.url)
      .pipe(catchError((err) => of(err.error.errors)));
  }
}
