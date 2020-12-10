import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Cliente } from '../cliente.model';
// import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(
    // private appStore: StoreService
    private db: AngularFirestore
  ) {}

  searchClientes() {
    console.log('searchClientes');
    const query = this.db
      .collection('clientes', (ref) => ref.orderBy('nome'))
      .snapshotChanges();
    query.pipe(
      tap((snaps) => console.log(snaps)),
      map((snaps) => {
        console.log(snaps);
        return snaps.map((snap) => {
          return (Object.assign(snap.payload.doc.data(), {
            id: snap.payload.doc.id,
          }) as unknown) as Cliente;
        });

        // return clientes;
      }),
      tap((clientes) => console.log(clientes))
    );

    return (query as unknown) as Observable<Cliente[]>;
  }
}
