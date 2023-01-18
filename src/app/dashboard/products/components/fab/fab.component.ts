import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styles: ['.scale {transform: scale(1.1)}'],
})
export class FABComponent {
  constructor(private readonly _modalService: ModalService) {}

  setModal() {
    this._modalService.setModalVisible();
  }
}
