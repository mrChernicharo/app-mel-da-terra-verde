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

  searchAllClientes(): Observable<Cliente[]> {
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
}
