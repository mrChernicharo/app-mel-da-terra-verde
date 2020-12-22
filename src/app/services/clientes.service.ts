import {
  Injectable,
  ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { delay, map, take, takeLast, tap } from 'rxjs/operators';
import { Cliente } from '../pages/clientes/cliente.model';
import { Pedido } from '../pages/pedidos/pedido.model';
import { StoreService } from './store.service';
// import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  // public storedClientes: Cliente[] = [];

  private clientesSubject$ = new BehaviorSubject<Cliente[]>([]);
  public appClientes$ = this.clientesSubject$.asObservable();

  constructor(
    private storeService: StoreService,
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

  // TODO -> atualizar pedidos do cliente ao criar novo pedido

  // findCliente(id: string) {
  //   let cliente: Cliente;
  //   const query = this.db
  //     .doc(`cllientes/${id}`)
  //     .get({ source: 'server' })
  //     .pipe(map((snap) => snap.data() as Cliente));

  //   query.subscribe((data) => {
  //     cliente = data;
  //   });

  //   return cliente;
  // }

  updatePedidosCliente(clienteId: string) {
    const query = this.db.collection<Cliente>('clientes', (ref) =>
      ref.where('id', '==', clienteId).limit(1)
    );

    query
      .snapshotChanges()
      .pipe(
        delay(100),
        map((snaps) => {
          const cliente = snaps.find(
            (snap) => snap.payload.doc.data().id === clienteId
          );
          return cliente;
        }),
        map((cliente) => {
          console.log(cliente.payload.doc.data());
          const changes = Object.assign({
            pedidos: cliente.payload.doc.data().pedidos + 1,
          });
          return changes as Partial<Cliente>;
        }),
        take(1)
      )
      .subscribe((changes) => {
        console.log(changes);
        this.db.doc(`clientes/${clienteId}`).update(changes);
      });
    // })

    // .subscribe();
    // .subscribe((data) =>
    //   data.map((snap) => {
    //     const cliente = snap.payload.doc.data() as Cliente;
    //     const changes = Object.assign(cliente, {
    //       pedidos: cliente.pedidos + 1,
    //     });

    //   })
    // );

    // .subscribe((data) => data.payload.doc.data())
    // .set((data) => (data.pedidos += 1), { merge: true });
  }

  // countClientes() {
  //   return this.clientesSubject$.getValue().length;
  // }
}
