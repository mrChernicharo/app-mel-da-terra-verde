import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of, pipe } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Cliente } from '../cliente.model';
// import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(
    private db: AngularFirestore // private appStore: StoreService
  ) {}

  searchClientes(): Observable<Cliente[]> {
    const query = this.db.collection('clientes', (ref) => ref.orderBy('nome'));

    return query.snapshotChanges().pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const cliente = Object.assign(snap.payload.doc.data(), {
            id: snap.payload.doc.id,
          });

          return cliente as Cliente;
        });
      })
    );
  }
}
