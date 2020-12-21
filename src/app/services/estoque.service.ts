import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { Pedido } from '../pages/pedidos/pedido.model';
import { PedidosService } from './pedidos.service';
import { ProdutosService } from './produtos.service';

export interface IMelBruto {
  mel: string;
  quantidade: number; // kilo
}

export interface IMelCompra {
  mel: string;
  quantidade: number; // grama
  valor: number;
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
    private produtosService: ProdutosService,
    private db: AngularFirestore
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

  _setEstoqueBruto(pedidos: Pedido[], compras: IMelCompra[]) {
    if (!pedidos.length || !compras.length) {
      // console.log('dados incompletos');
      return;
    }
    // console.log('dados prontos!!!');

    const reducedEstoque = compras.reduce((acc, next) => {
      if (acc.filter((item) => item.mel === next.mel).length < 1) {
        //
        acc.push({ mel: next.mel, quantidade: 0 });
      }
      const index = acc.findIndex((item) => item.mel === next.mel);
      console.log(next);

      acc[index].quantidade += +next.quantidade;
      //
      return acc;
    }, []);

    console.log(reducedEstoque);
    this.estoqueBrutoSubject$.next(reducedEstoque);
  }

  getEstoqueBruto() {
    return this.estoqueBrutoSubject$.getValue();
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

  async registerNewCompra(compra) {
    console.log(compra);

    const query = this.db.collection('compras').add(compra);

    await query.then((response) => console.log(response));
  }
}
