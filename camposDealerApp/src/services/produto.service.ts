import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends ConfigService{

  constructor(public http: HttpClient) {
    super();
  }

  url = this.requestURL + 'produtos';

  public consultaProdutos() {
    return this.http.get<any[]>(this.url);
  }

  public salvarProduto(produto: any) {
    return this.http.post<any[]>(this.url, produto);
  }

  public excluirProduto(idProduto: any) {
    return this.http.delete<any[]>(this.url + '/' + idProduto);
  }
}
