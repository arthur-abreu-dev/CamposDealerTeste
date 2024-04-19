import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VendaService extends ConfigService {

  constructor(public http: HttpClient) {
    super();
  }

  url = this.requestURL + 'vendas';

  public consultaVendas() {
    return this.http.get<any[]>(this.url);
  }

  public consultaProdutosVenda(idVenda: number) {
    return this.http.get<any[]>(this.url + '/' + idVenda);
  }


  public salvarVenda(venda: any) {
    return this.http.post<any[]>(this.url, venda);
  }

  public excluirVenda(idVenda: any) {
    return this.http.delete<any[]>(this.url + '/' + idVenda);
  }
}
