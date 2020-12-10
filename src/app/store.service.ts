// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Cliente } from './cliente.model';
// import { Pedido } from './pedido.model';
// import { Produto } from './produto.model';

// Injectable({
//   providedIn: 'root',
// });
// export class StoreService {
//   saldoStore$: Observable<Number>;
//   // clientesStore$: Observable<Cliente[]>;
//   private clientesSubject = new BehaviorSubject<Cliente[]>([]);
//   public clientesStore$: Observable<
//     Cliente[]
//   > = this.clientesSubject.asObservable();
//   pedidosStore$: Observable<Pedido[]>;
//   produtosStore$: Observable<Produto[]>;

//   constructor(private db: AngularFirestore) {
//     this.clientesSubject.subscribe((clientes) => {
//       this.clientesStore$ = of(clientes);
//     });
//   }

//   fetchClientes() {
//     const dummyCliente: Cliente = {
//       id: 'hnunwdoinqwoid',
//       nome: 'José',
//       email: 'jose@gmail.com',
//       telefone: '212121212121',
//       dataCadastro: new Date(2020, 11, 4),
//       pedidos: [],
//     };

//     // this.clientesStore$ = of([dummyCliente]);
//     return this.clientesStore$;
//   }
// }
