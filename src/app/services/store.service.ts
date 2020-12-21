import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cliente } from '../pages/clientes/cliente.model';
import { Pedido } from '../pages/pedidos/pedido.model';
import { Produto } from '../pages/produtos/produto.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // private _appStore: AppStore;

  saldoStore$: Observable<Number>;
  pedidosStore$: Observable<Pedido[]>;
  produtosStore$: Observable<Produto[]>;
  // clientesStore$: Observable<Cliente[]>;
  private clientesStore: Cliente[] = [];
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);

  private store = {};

  constructor() {
    // this._appStore.clientes = [];
    // this._appStore.pedidos = [];
    // this._appStore.produtos = [];
  }

  // public storeClientes(clientes: Cliente[]) {
  //   console.log('ATENÇÃO: storing Clientes!');
  //   console.log(clientes);
  //   // this._appStore.clientes.push(...clientes);
  //   this.clientesStore.push(...clientes);
  //   console.log(this.clientesStore);
  //   // console.log(this._appStore);
  // }
}
