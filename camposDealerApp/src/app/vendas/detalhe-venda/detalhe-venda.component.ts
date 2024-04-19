import { Component, OnInit } from '@angular/core';
import { ModalInjectService } from '../../../services/modal-inject.service';
import { VendaService } from '../../../services/venda.service';
import { ProdutoService } from '../../../services/produto.service';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalSelecaoProdutoComponent } from '../../produtos/modal-selecao-produto/modal-selecao-produto.component';
import { ClienteService } from '../../../services/cliente.service';


@Component({
  selector: 'app-detalhe-venda',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './detalhe-venda.component.html',
  styleUrl: './detalhe-venda.component.css'
})
export class DetalheVendaComponent implements OnInit {

  listaClientes: any[] = [];
  formVenda: FormGroup;
  modalRef: MdbModalRef<any> | null = null;

  constructor(
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private modalInjectService: ModalInjectService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: MdbModalService) {
    this.formVenda = this.formBuilder.group({
      idVenda: 0,
      idCliente: [null, [Validators.required]],
      vlrTotalVenda: [null],
      dthVenda: null,
      listaProdutos: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.consultaClientes();
    this.formVenda.patchValue(this.modalInjectService.getData());
    let dataSemFormato;
    if (this.formVenda.get('dthVenda')?.value !== null && this.formVenda.get('dthVenda')?.value !== undefined) {
      dataSemFormato = new Date(this.formVenda.get('dthVenda')?.value);
    } else {
      dataSemFormato = new Date();
    }
    if (this.formVenda.get('idVenda')?.value !== null && this.formVenda.get('idVenda')?.value !== undefined) {
      this.consultaProdutosVenda();
    }
    this.formVenda.get('dthVenda')?.setValue(dataSemFormato.toLocaleDateString());
  }
  consultaClientes(): void {
    this.clienteService.consultaClientes().subscribe(resultado => {
      this.listaClientes = resultado;
    })
  }

  consultaProdutosVenda(): void {
    this.vendaService.consultaProdutosVenda(this.formVenda.get('idVenda')?.value).subscribe(resultado => {
      resultado.forEach(produto => {
        this.adicionaProduto(produto);
      });
    })
  }

  addItem() {
    const item = this.formBuilder.group({
      idVenda: 0,
      idProduto: [null, Validators.required],
      dscProduto: [null, Validators.required],
      vlrUnitarioVenda: [null, Validators.required],
      qtdVenda: [null, Validators.required]
    });

    // Add the new form group to the FormArray
    this.listaProdutos.push(item);
  }

  // Helper method to get the 'items' FormArray
  get listaProdutos() {
    return this.formVenda.get('listaProdutos') as FormArray;
  }

  abrirModalBuscaProdutos(): void {
    this.modalRef = this.modalService.open(ModalSelecaoProdutoComponent);
    this.modalRef.onClose.subscribe((resultado) => {
      if (resultado) {
        this.adicionaProduto(resultado);
      }
    });
  }

  adicionaProduto(produto: any): void {
    this.addItem();
    if (produto.vlrUnitarioVenda === null || produto.vlrUnitarioVenda === undefined) {
      produto.vlrUnitarioVenda = produto.vlrUnitario;
    }
    this.listaProdutos.controls[this.listaProdutos.length - 1].patchValue(produto);
  }

  excluirItem(indexListaProdutos: number): void {
    this.listaProdutos.removeAt(indexListaProdutos);
  }

  salvar(): void {
    this.formVenda.markAllAsTouched();
    if (this.formVenda.valid) {
      let venda = this.formVenda.getRawValue();
      let listaTratada: any[] = [];
      venda.listaProdutos.forEach((produto: any) => {
        let produtoTratado: any = {};
        produtoTratado.idVenda = produto.idVenda;
        produtoTratado.idProduto = produto.idProduto;
        produtoTratado.vlrUnitarioVenda = Number(produto.vlrUnitarioVenda);
        produtoTratado.qtdVenda = Number(produto.qtdVenda);
        listaTratada.push(produtoTratado);
      });
      venda.listaProdutos = listaTratada;
      venda.vlrTotalVenda = 0;
      venda.dthVenda = new Date();
      this.vendaService.salvarVenda(venda).subscribe(resultado => {
        this.router.navigate(['/vendas']);
      });
    }
  }


}
