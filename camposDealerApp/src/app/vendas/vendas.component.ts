import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VendaService } from '../../services/venda.service';
import { ModalInjectService } from '../../services/modal-inject.service';
import { ModalConfirmacaoComponent } from '../componentes-gerais/modal-confirmacao/modal-confirmacao.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css'
})
export class VendasComponent implements OnInit {
  listaVendas: any[] = [];
  listaVendasExibicao: any[] = [];
  modalRef: MdbModalRef<any> | null = null;
  filtro: { idCliente: string } = { idCliente: '' };

  constructor(private vendaService: VendaService, private modalService: MdbModalService, private modalInjectService: ModalInjectService, private router: Router) {

  }

  ngOnInit() {
    this.consultaVendas();
  }

  consultaVendas(): void {
    this.vendaService.consultaVendas().subscribe(resultado => {
      this.listaVendas = resultado;
      this.geraListaExibicao();
    })
  }

  valorVazio(valor: any): boolean {
    return valor === null || valor === undefined || valor === '';
  }

  geraListaExibicao(): void {
    this.listaVendasExibicao = this.listaVendas
    //this.listaVendasExibicao = this.listaVendas.filter((item) => item.idCliente === this.filtro?.idCliente.toLowerCase());
  }

  adicionarVenda(): void {
    this.abrirDetalhesVenda(null);
  }

  abrirDetalhesVenda(venda?: any) {
    this.modalInjectService.setData(venda);
    this.router.navigate(['/detalhe-venda']);
  }

  deletarVenda(venda: any): void {
    this.modalRef = this.modalService.open(ModalConfirmacaoComponent);
    this.modalRef.onClose.subscribe((resultado) => {
      if (resultado) {
        this.vendaService.excluirVenda(venda.idVenda).subscribe(resultado => {
          this.consultaVendas();
        })
      }
    });
  }
}
