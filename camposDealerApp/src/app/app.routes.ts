import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { InicioComponent } from './inicio/inicio.component';
import { DetalheVendaComponent } from './vendas/detalhe-venda/detalhe-venda.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'vendas', component: VendasComponent },
    { path: 'detalhe-venda', component: DetalheVendaComponent },
    { path: 'produtos', component: ProdutosComponent }
];
