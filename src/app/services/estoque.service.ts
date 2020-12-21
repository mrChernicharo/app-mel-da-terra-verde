import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from '../pages/pedidos/pedido.model';
import { PedidosService } from './pedidos.service';
import { ProdutosService } from './produtos.service';

export interface IMelBruto {
  mel: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  public meles = ['laranjeira', 'eucalípto', 'uruçá', 'jataí'];

  private estoqueBrutoSubject$ = new BehaviorSubject<IMelBruto[]>([]);
  public estoqueBruto$ = this.estoqueBrutoSubject$.asObservable();

  private saldoSubject$ = new BehaviorSubject<number>(0);
  public saldo$ = this.saldoSubject$.asObservable();

  constructor(
    private pedidosService: PedidosService,
    private produtosService: ProdutosService
  ) {}

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

  _setEstoqueBruto(pedidos, compras) {
    const initialEstoque: IMelBruto[] = this.meles.map((mel) => {
      return { mel, quantidade: 0 };
    });
  }

  getEstoqueBruto() {
    return this.estoqueBrutoSubject$.getValue();
  }
}
