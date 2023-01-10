import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { TOKEN } from 'src/app/constants';
import { BaseResponse } from 'src/app/types/contracts/baseResponse.type';
import { AuthRequest, User } from 'src/app/types/users/user.type';
import { environment } from 'src/environments/environment';
import jwt from 'jwt-decode';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseUrl: string = `${environment.baseUrl}/users`;
  private _user!: User;

  get user(): User {
    return { ...this.user };
  }

  constructor(private readonly http: HttpClient) {}

  register(request: AuthRequest) {
    const url: string = `${this._baseUrl}/register`;
    return this.http.post<BaseResponse<string>>(url, request).pipe(
      tap(({ ok, data }) => {
        if (ok) {
          this.setToken(data);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.errors))
    );
  }

  login(request: AuthRequest) {
    const url: string = `${this._baseUrl}/login`;
    return this.http.post<BaseResponse<string>>(url, request).pipe(
      tap(({ ok, data }) => {
        if (ok) {
          this.setToken(data);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.errors))
    );
  }

  renew() {
    const url: string = `${this._baseUrl}/login`;
    return this.http.get<BaseResponse<string>>(url).pipe(
      map(({ ok, data }) => {
        this.setToken(data);
        this._user = this.decodeUserFromToken();
        return ok;
      }),
      catchError(() => of(false))
    );
  }
  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN)!.toString();
  }

  deleteToken() {
    localStorage.removeItem(TOKEN);
  }

  decodeUserFromToken(): User {
    const token = this.getToken();
    const result: any = jwtDecode(token);
    console.log(result);

    const nameKey =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    const idKey =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
    return {
      id: result[idKey],
      email: result[nameKey],
    };
  }
}
