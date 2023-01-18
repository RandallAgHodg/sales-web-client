import { Component } from '@angular/core';
import { ModalSalesService } from '../modal-sales.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styles: [],
})
export class FABComponent {
  constructor(private readonly _modalService: ModalSalesService) {}

  setModal() {
    this._modalService.setModalVisible();
  }
}
