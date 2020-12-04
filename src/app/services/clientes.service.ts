import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Cliente } from '../cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor() {}

  searchClientes() {
    const dummyCliente: Cliente = {
      id: 'hnunwdoinqwoid',
      nome: 'José',
      email: 'jose@gmail.com',
      telefone: '212121212121',
      dataCadastro: new Date(2020, 11, 4),
      pedidos: [],
    };

    return of([dummyCliente]);
  }
}
