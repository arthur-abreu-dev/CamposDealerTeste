import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalInjectService {

  constructor() {

  }

  private data: any;

  getData(): any {
    return this.data;
  }

  setData(data: any): void {
    this.data = data;
  }

}
