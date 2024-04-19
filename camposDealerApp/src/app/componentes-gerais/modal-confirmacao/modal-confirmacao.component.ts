import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-comfirmacao',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.css'
})
export class ModalConfirmacaoComponent {

  constructor(public modalRef: MdbModalRef<ModalConfirmacaoComponent>) {

  }

  confirmar(confirmado: boolean): void {
    this.modalRef.close(confirmado);
  }

}
