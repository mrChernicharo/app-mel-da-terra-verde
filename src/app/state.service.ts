import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';
import { Pedido } from './pedido.model';
import { Produto } from './produto.model';

Injectable({
  providedIn: 'root',
});
export class StateService {
  saldoStore$: Observable<Number>;
  clientesStore$: Observable<Cliente[]>;
  pedidosStore$: Observable<Pedido[]>;
  produtosStore$: Observable<Produto[]>;

  constructor() {}
}
