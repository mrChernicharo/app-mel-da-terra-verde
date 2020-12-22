import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { delay, map, take, takeLast, tap } from 'rxjs/operators';
import { Cliente } from '../pages/clientes/cliente.model';
import { Pedido } from '../pages/pedidos/pedido.model';
// import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  // public storedClientes: Cliente[] = [];

  private clientesSubject$ = new BehaviorSubject<Cliente[]>([]);
  public appClientes$ = this.clientesSubject$.asObservable();

  constructor(
    private db: AngularFirestore // private appStore: StoreService
  ) {}

  fetchAllClientes(): Observable<Cliente[]> {
    const query = this.db.collection<Cliente>('clientes', (ref) =>
      ref.orderBy('nome')
    );

    return query.snapshotChanges().pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const cliente = Object.assign(snap.payload.doc.data(), {
            id: snap.payload.doc.id,
          });

          return cliente;
        });
      }),
      take(1),
      tap((clientes) => {
        this.clientesSubject$.next(clientes);
      })
    );
  }

  addNewCliente({
    nome,
    email,
    telefone,
  }: Omit<Cliente, 'id' | 'dataCadastro' | 'pedidos'>) {
    const newCliente: Cliente = {
      nome,
      email,
      telefone,
      dataCadastro: new Date(),
      atualizadoEm: new Date(),
      pedidos: 0,
    };
    console.log(newCliente);

    this.db
      .collection('clientes')
      .add(newCliente)
      .then((data) => {
        const changes = {
          id: data.id,
        };
        this.db.doc(`clientes/${data.id}`).update(changes);
      });
  }

  updatePedidosCliente(clienteId: string) {
    const query = this.db.collection<Cliente>('clientes', (ref) =>
      ref.where('id', '==', clienteId).limit(1)
    );

    query
      .snapshotChanges()
      .pipe(
        delay(100),
        take(1),
        map((snaps) => {
          const cliente = snaps.find(
            (snap) => snap.payload.doc.data().id === clienteId
          );
          //
          return cliente.payload.doc.data();
        }),
        map((cliente) => {
          const changes: Partial<Cliente> = Object.assign({
            pedidos: cliente.pedidos + 1,
          });
          //
          return changes;
        })
      )
      .subscribe((changes) => {
        this.db
          .doc(`clientes/${clienteId}`)
          .update(changes)
          .then(() => this.fetchAllClientes().toPromise());
      });
  }

  // countClientes() {
  //   return this.clientesSubject$.getValue().length;
  // }
}
