import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Pedido } from '../pages/pedidos/pedido.model';
import { ClientesService } from './clientes.service';
import { EstoqueService } from './estoque.service';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  storedPedidos: Pedido[];
  constructor(
    private db: AngularFirestore,
    private estoque: EstoqueService,
    private clientesService: ClientesService
  ) {}

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
    idCliente,
    dataPedido,
    previsaoEntrega,
    desconto,
    produtos,
    valor,
  }: Omit<Pedido, 'id' | 'pago' | 'status'>) {
    console.log('addNewPedido');

    this.clientesService.updatePedidosCliente(idCliente);

    const newPedido = {
      nomeCliente,
      idCliente,
      dataPedido: new Date(dataPedido as Date),
      previsaoEntrega: new Date(previsaoEntrega as Date),
      status: 'pendente',
      desconto,
      produtos,
      valor,
      pago: false,
    };
    console.log(newPedido);

    this.db
      .collection('pedidos')
      .add(newPedido)
      .then(() => {
        this.estoque.getSaldo();
        // this.estoque.subtractFromMelStock(newPedido.produtos);
      });

    // this.clientesService.updatePedidosCliente(idCliente);
  }

  updatePedido(pedidoId: string, changes: Partial<Pedido>) {
    return from(this.db.doc(`pedidos/${pedidoId}`).update(changes)).pipe(
      tap(() => {
        this.fetchAllPedidos().subscribe(() => console.log('pega!'));
      })
    );
  }
}
