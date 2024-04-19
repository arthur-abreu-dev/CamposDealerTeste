import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ClienteService } from '../../../services/cliente.service';
import { ModalInjectService } from '../../../services/modal-inject.service';

@Component({
  selector: 'app-modal-cliente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.css'
})
export class ModalClienteComponent {

  formCliente: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalClienteComponent>, private formBuilder: FormBuilder, private clienteService: ClienteService, private modalInjectService: ModalInjectService) {
    this.formCliente = this.formBuilder.group({
      idCliente: 0,
      nmCliente: ['', [Validators.required]],
      nmCidade: ['', Validators.required]
    });

    this.formCliente.patchValue(this.modalInjectService.getData());
  }

  salvar(): void {
    this.formCliente.markAllAsTouched();
    if (this.formCliente.valid) {
      this.clienteService.salvarCliente(this.formCliente.getRawValue()).subscribe(resultado => {
        this.modalRef.close();
      });
    }
  }

}
