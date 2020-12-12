import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Pedido } from '../pages/pedidos/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  storedPedidos: Pedido[];
  constructor(private db: AngularFirestore) {}

  fetchAllPedidos(): Observable<Pedido[]> {
    const query = this.db.collection<Pedido>('pedidos', (ref) =>
      ref.orderBy('dataPedido', 'desc')
    );

    return query.snapshotChanges().pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const pedido = Object.assign(snap.payload.doc.data(), {
            id: snap.payload.doc.id,
          });

          return pedido;
        });
      }),
      take(1),
      tap((pedidos) => {
        this.storedPedidos = pedidos;
        console.log(this.storedPedidos);
      })
    );
  }
}
