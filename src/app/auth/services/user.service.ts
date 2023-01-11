import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { TOKEN } from 'src/app/constants';
import { BaseResponse } from 'src/app/types/contracts/baseResponse.type';
import { AuthRequest, User } from 'src/app/types/users/user.type';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _baseUrl: string = `${environment.baseUrl}/users`;
  private _user!: User;

  get user(): User {
    return { ...this._user };
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
      catchError((err) => {
        console.log(err);
        return of(err.error.errors);
      })
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

  renew(): Observable<boolean> {
    const url: string = `${this._baseUrl}/authenticate`;
    return this.http.get<BaseResponse<string>>(url).pipe(
      map((resp) => {
        console.log('this._user');
        this.setToken(resp.data);
        this._user = { ...this.decodeUserFromToken() };
        return resp.ok;
      }),
      catchError(() => of(false))
    );
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN)?.toString() || '';
  }

  logout() {
    localStorage.removeItem(TOKEN);
  }

  decodeUserFromToken(): User {
    const token = this.getToken();
    const result: any = jwtDecode(token);

    const nameKey =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

    const idKey =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';

    const user: User = {
      id: result[idKey],
      email: result[nameKey],
    };

    return user;
  }
}
