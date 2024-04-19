import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProdutoService } from '../../../services/produto.service';
import { ModalInjectService } from '../../../services/modal-inject.service';

@Component({
  selector: 'app-modal-produto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-produto.component.html',
  styleUrl: './modal-produto.component.css'
})
export class ModalProdutoComponent {

  formProduto: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalProdutoComponent>,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private modalInjectService: ModalInjectService
  ) {
    this.formProduto = this.formBuilder.group({
      idProduto: 0,
      dscProduto: ['', [Validators.required]],
      vlrUnitario: [null, Validators.required]
    });

    this.formProduto.patchValue(this.modalInjectService.getData());
  }

  valorVazio(valor: any): boolean {
    return valor === null || valor === undefined || valor === '';
  }


  filtroNumerico() {
    if (!this.valorVazio(this.formProduto.get('vlrUnitario')?.value)) {
      let valorFiltrado = String(this.formProduto.get('vlrUnitario')?.value).replace(/[^\d.-]/g, '');
      this.formProduto.get('vlrUnitario')?.setValue(valorFiltrado);
    }
  }

  salvar(): void {
    this.formProduto.markAllAsTouched();
    if (this.formProduto.valid) {
      this.produtoService.salvarProduto(this.formProduto.getRawValue()).subscribe(resultado => {
        this.modalRef.close();
      });
    }
  }


}
