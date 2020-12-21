import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from '../pages/pedidos/pedido.model';
import { PedidosService } from './pedidos.service';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private saldoSubject$ = new BehaviorSubject<number>(0);
  public saldo$ = this.saldoSubject$.asObservable();

  constructor(private pedidosService: PedidosService) {}

  _setSaldo(pedidos: Pedido[]): void {
    const saldo = pedidos.reduce((init, next) => {
      if (next.pago) {
        init += next.valor ? +next.valor : 0;
      }
      return init;
    }, 0);

    this.saldoSubject$.next(saldo);
  }

  getSaldo(): number {
    return this.saldoSubject$.getValue();
  }
}
