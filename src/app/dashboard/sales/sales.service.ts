import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap, of } from 'rxjs';
import { BaseResponse } from '../../types/contracts/baseResponse.type';
import { Sale, CreateSaleRequest } from '../../types/sales/sales.type';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private readonly _baseUrl: string = `${environment.baseUrl}/sales`;
  constructor(private readonly _http: HttpClient) {}

  getAllSales() {
    return this._http.get<BaseResponse<Sale[]>>(this._baseUrl).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }

  getSaleById(id: string) {
    const url: string = `${this._baseUrl}/${id}`;
    return this._http.get(url).pipe(catchError((err) => of(err.error.errors)));
  }

  addSale(request: CreateSaleRequest) {
    return this._http
      .post<BaseResponse<Sale>>(this._baseUrl, request)
      .pipe(catchError((err) => of(err.error.errors)));
  }

  deleteSale(id: string) {
    const url: string = `${this._baseUrl}/${id}`;
    return this._http
      .delete<BaseResponse<string>>(url)
      .pipe(catchError((err) => of(err.error.errors)));
  }
}
