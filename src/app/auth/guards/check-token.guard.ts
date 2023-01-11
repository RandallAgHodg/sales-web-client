import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenGuard implements CanActivate {
  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this._userService.renew().pipe(
      tap((valid) => {
        if (!valid) {
          this._router.navigateByUrl('/auth');
        }
      })
    );
  }
}
