import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { Pedido } from '../pages/pedidos/pedido.model';
import { Produto } from '../pages/produtos/produto.model';
import { IServerTimestamp } from '../shared/server-timestamp.pipe';
import { PedidosService } from './pedidos.service';
import { ProdutosService } from './produtos.service';

// export interface IMelBruto {
//   mel: string;
//   quantidade: number; // kilo
// }

export interface IMelCompra {
  mel: string;
  quantidade: number; // grama
  valor: number;
  dataCompra?: Date | IServerTimestamp;
}

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  public meles = ['laranjeira', 'eucalípto', 'uruçá', 'jataí'];

  private estoqueBrutoSubject$ = new BehaviorSubject<IMelCompra[]>([]);
  public estoqueBruto$ = this.estoqueBrutoSubject$.asObservable();

  private saldoSubject$ = new BehaviorSubject<number>(0);
  public saldo$ = this.saldoSubject$.asObservable();

  constructor(
    // private pedidosService: PedidosService,
    // private produtosService: ProdutosService,
    private db: AngularFirestore
  ) {}

  _setSaldo(pedidos: Pedido[], compras: IMelCompra[]): void {
    const saldoPedidos = pedidos.reduce((init, next) => {
      if (next.pago) {
        init += next.valor ? +next.valor : 0;
      }
      return init;
    }, 0);

    const saldoCompras = compras.reduce((acc, next) => (acc += next.valor), 0);

    const saldo = saldoPedidos - saldoCompras;

    this.saldoSubject$.next(saldo);
  }

  getSaldo(): number {
    return this.saldoSubject$.getValue();
  }

  _setEstoqueBruto(pedidos: Pedido[], compras: IMelCompra[]) {
    if (!pedidos.length || !compras.length) {
      return;
    }

    const valorTotalCompras = compras.reduce(
      (acc, next) => (acc += next.valor),
      0
    );

    // this.subtractFromSaldo(valorTotalCompras);

    const reducedEstoque = this.reduceCompras(compras);
    console.log(reducedEstoque);

    const valorTotalEstoque = reducedEstoque.reduce(
      (acc, next) => (acc += next.valor),
      0
    );

    this.saldoSubject$.next(valorTotalEstoque - valorTotalCompras);

    for (let i = 0; i < pedidos.length; i++) {
      for (let produto of pedidos[i].produtos) {
        const j = reducedEstoque.findIndex((mel) => mel.mel === produto.mel);
        // const estoqueMel = reducedEstoque.find(mel => mel.mel === produto.mel)
        switch (produto.pote) {
          case '150':
            reducedEstoque[j].quantidade -= 150 * produto.quantidade;
            break;
          case '350':
            reducedEstoque[j].quantidade -= 350 * produto.quantidade;
            break;
          case '480':
            reducedEstoque[j].quantidade -= 480 * produto.quantidade;
            break;
          case '780':
            reducedEstoque[j].quantidade -= 780 * produto.quantidade;
            break;
          case 'kit':
            reducedEstoque[j].quantidade -= 240 * produto.quantidade;
            break;
          default:
            break;
        }
      }
    }
    this.estoqueBrutoSubject$.next(reducedEstoque);
  }

  getEstoqueBruto() {
    return this.estoqueBrutoSubject$.getValue();
  }

  async registerNewCompra(compra) {
    console.log(compra);

    const query = this.db.collection('compras').add(compra);

    await query.then((response) => console.log(response));
  }

  getCompras() {
    return this.db
      .collection('compras')
      .snapshotChanges()
      .pipe(
        shareReplay(),
        map((snaps) =>
          snaps.map(
            (snap) => (snap.payload.doc.data() as unknown) as IMelCompra
          )
        ),
        tap((compras) => console.log(compras))
      );
  }

  reduceCompras(compras: IMelCompra[]): IMelCompra[] {
    return compras.reduce((acc, next) => {
      if (acc.filter((item) => item.mel === next.mel).length < 1) {
        // acrescente um obj no acc caso ainda não exista lá um obj com a prop 'mel' da vez
        acc.push({ mel: next.mel, quantidade: 0, valor: 0 });
      }

      const index = acc.findIndex((item) => item.mel === next.mel);
      // console.log(next);

      acc[index].quantidade += +next.quantidade;
      acc[index].valor += +next.valor;
      //
      return acc;
    }, []);
  }

  // subtractFromMelStock(produtos: Produto[]) {
  //   console.log('produtos');
  //   console.log(produtos);

  //   const estoqueState = this.estoqueBrutoSubject$.getValue();

  //   console.log('estoqueState');
  //   console.log(estoqueState);

  //   const updatedEstoque = estoqueState.reduce((acc, next, i) => {
  //     acc.push(next);
  //     let found = produtos.find((prod) => prod.mel === next.mel);
  //     if (found) {
  //       console.log(found);

  //       switch (found.pote) {
  //         case '150':
  //           acc[i].quantidade -= 150 * found.quantidade;
  //           break;
  //         case '350':
  //           acc[i].quantidade -= 350 * found.quantidade;
  //           break;
  //         case '480':
  //           acc[i].quantidade -= 480 * found.quantidade;
  //           break;
  //         case '780':
  //           acc[i].quantidade -= 780 * found.quantidade;
  //           break;
  //         case 'kit':
  //           acc[i].quantidade -= 240 * found.quantidade;
  //           break;
  //         default:
  //           break;
  //       }
  //     }

  //     return acc;
  //   }, []);

  //   console.log('updatedEstoque');
  //   console.log(updatedEstoque);

  //   return updatedEstoque;

  //   // this.estoqueBrutoSubject$.next(updatedEstoque);
  // }
}
