import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ConfigService {

  constructor(public http: HttpClient) {
    super();
  }

  url = this.requestURL + 'clientes';

  public consultaClientes() {
    return this.http.get<any[]>(this.url);
  }

  public salvarCliente(cliente: any) {
    return this.http.post<any[]>(this.url, cliente);
  }

  public excluirCliente(idCliente: any) {
    return this.http.delete<any[]>(this.url + '/' + idCliente);
  }
}
