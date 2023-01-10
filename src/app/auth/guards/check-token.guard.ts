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
export class CheckTokenGuard implements CanActivate, CanLoad {
  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._userService.renew().pipe(
      tap((valid) => {
        if (!valid) {
          this._router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._userService.renew().pipe(
      tap((valid) => {
        if (!valid) {
          this._router.navigateByUrl('/auth');
        }
      })
    );
  }
}
