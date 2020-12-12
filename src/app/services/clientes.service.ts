import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, pipe } from 'rxjs';
import { delay, map, take, takeLast, tap } from 'rxjs/operators';
import { Cliente } from '../pages/clientes/cliente.model';
import { StoreService } from './store.service';
// import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  public storedClientes: Cliente[] = [];

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
        this.storedClientes = clientes;
        console.log(this.storedClientes);
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
}
