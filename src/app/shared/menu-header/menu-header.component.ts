import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styles: [],
})
export class MenuHeaderComponent implements OnInit {
  userId!: string;
  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}
  ngOnInit(): void {
    this.userId = this._userService.user.id;
  }

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/auth');
  }
}
