import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Pedido } from '../pages/pedidos/pedido.model';
import { EstoqueService } from './estoque.service';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  storedPedidos: Pedido[];
  constructor(private db: AngularFirestore, private estoque: EstoqueService) {}

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
      })
    );
  }

  addNewPedido({
    nomeCliente,
    dataPedido,
    previsaoEntrega,
    desconto,
    produtos,
    valor,
  }: Omit<Pedido, 'id' | 'idCliente' | 'pago' | 'status'>) {
    console.log('addNewPedido');

    const newPedido = {
      nomeCliente,
      dataPedido: new Date(dataPedido as Date),
      previsaoEntrega: new Date(previsaoEntrega as Date),
      desconto,
      produtos,
      valor,
      status: 'pendente',
      pago: false,
    };
    console.log(newPedido);

    this.db
      .collection('pedidos')
      .add(newPedido)
      .then(() => this.estoque.getSaldo());
  }

  updatePedido(pedidoId: string, changes: Partial<Pedido>) {
    return from(this.db.doc(`pedidos/${pedidoId}`).update(changes)).pipe(
      tap(() => {
        this.fetchAllPedidos().subscribe(() => console.log('pega!'));
      })
    );
  }
}
