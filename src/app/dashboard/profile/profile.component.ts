import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/types/users/user.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(private readonly _userService: UserService) {}
  ngOnInit(): void {
    this.user = this._userService.user;
  }
}
