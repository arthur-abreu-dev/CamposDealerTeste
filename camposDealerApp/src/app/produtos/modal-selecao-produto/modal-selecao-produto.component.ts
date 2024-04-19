import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-selecao-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-selecao-produto.component.html',
  styleUrl: './modal-selecao-produto.component.css'
})
export class ModalSelecaoProdutoComponent implements OnInit {

  listaProdutos: any[] = [];
  listaProdutosExibicao: any[] = [];
  filtro: { descricao: string } = { descricao: '' };

  constructor(private produtoService: ProdutoService, public modalRef: MdbModalRef<ModalSelecaoProdutoComponent>) {

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

  selecionarProduto(produto: any): void {
    this.modalRef.close(produto);
  }
}
