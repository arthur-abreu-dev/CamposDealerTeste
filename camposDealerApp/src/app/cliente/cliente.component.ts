import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalInjectService } from '../../services/modal-inject.service';
import { ModalConfirmacaoComponent } from '../componentes-gerais/modal-confirmacao/modal-confirmacao.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  listaClientes: any[] = [];
  listaClientesExibicao: any[] = [];
  modalRef: MdbModalRef<any> | null = null;
  filtro: { nome: string, cidade: string } = {nome: '', cidade: ''};

  constructor(private clienteService: ClienteService, private modalService: MdbModalService, private modalInjectService: ModalInjectService) {

  }

  ngOnInit() {
    this.consultaClientes();
  }

  consultaClientes(): void {
    this.clienteService.consultaClientes().subscribe(resultado => {
      this.listaClientes = resultado;
      this.geraListaExibicao();
    })
  }

  valorVazio(valor: any): boolean {
    return valor === null || valor === undefined || valor === '';
  }

  geraListaExibicao(): void {
    this.listaClientesExibicao = this.listaClientes.filter((item) => (this.valorVazio(this.filtro?.nome) || String(item.nmCliente).toLowerCase().includes(this.filtro?.nome.toLowerCase()!)) &&
      (this.valorVazio(this.filtro?.cidade) || String(item.nmCidade).toLowerCase().includes(this.filtro?.cidade.toLowerCase()!)));
  }

  adicionarCliente(): void {
    this.abrirModal(null);
  }

  abrirModal(cliente?: any) {
    this.modalInjectService.setData(cliente);
    this.modalRef = this.modalService.open(ModalClienteComponent);
    this.modalRef.onClose.subscribe(() => {
      this.consultaClientes();
    });
  }

  deletarCliente(cliente: any): void {
    this.modalRef = this.modalService.open(ModalConfirmacaoComponent);
    this.modalRef.onClose.subscribe((resultado) => {
      if (resultado) {
        this.clienteService.excluirCliente(cliente.idCliente).subscribe(resultado => {
          this.consultaClientes();
        })
      }
    });
  }
}
