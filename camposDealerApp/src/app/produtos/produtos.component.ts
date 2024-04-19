import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutoService } from '../../services/produto.service';
import { ModalInjectService } from '../../services/modal-inject.service';
import { ModalConfirmacaoComponent } from '../componentes-gerais/modal-confirmacao/modal-confirmacao.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalProdutoComponent } from './modal-produto/modal-produto.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  listaProdutos: any[] = [];
  listaProdutosExibicao: any[] = [];
  modalRef: MdbModalRef<any> | null = null;
  filtro: { descricao: string } = { descricao: '' };

  constructor(private produtoService: ProdutoService, private modalService: MdbModalService, private modalInjectService: ModalInjectService) {

  }

  ngOnInit() {
    this.consultaProdutos();
  }

  consultaProdutos(): void {
    this.produtoService.consultaProdutos().subscribe(resultado => {
      this.listaProdutos = resultado;
      this.geraListaExibicao();
    })
  }

  valorVazio(valor: any): boolean {
    return valor === null || valor === undefined || valor === '';
  }

  geraListaExibicao(): void {
    this.listaProdutosExibicao = this.listaProdutos.filter((item) => (
      this.valorVazio(this.filtro?.descricao) || String(item.dscProduto).toLowerCase().includes(this.filtro?.descricao.toLowerCase()!))
    );
  }

  adicionarProduto(): void {
    this.abrirModal(null);
  }

  abrirModal(produto?: any) {
    this.modalInjectService.setData(produto);
    this.modalRef = this.modalService.open(ModalProdutoComponent);
    this.modalRef.onClose.subscribe(() => {
      this.consultaProdutos();
    });
  }

  deletarProduto(produto: any): void {
    this.modalRef = this.modalService.open(ModalConfirmacaoComponent);
    this.modalRef.onClose.subscribe((resultado) => {
      if (resultado) {
        this.produtoService.excluirProduto(produto.idProduto).subscribe(resultado => {
          this.consultaProdutos();
        })
      }
    });
  }
}
