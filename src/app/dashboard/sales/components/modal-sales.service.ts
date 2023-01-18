import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalSalesService {
  showModal$ = new BehaviorSubject<boolean>(false);
  modalState$ = this.showModal$.asObservable();

  constructor() {}

  setModalVisible() {
    this.showModal$.next(true);
  }

  setModalInvisible() {
    this.showModal$.next(false);
  }
}
