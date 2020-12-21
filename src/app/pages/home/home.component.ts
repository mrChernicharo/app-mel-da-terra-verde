import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstoqueService } from 'src/app/services/estoque.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { produtosImgUrls } from 'src/assets/img.paths';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {
  // totalClientes: number;
  saldo$: Observable<number>;
  totalClientes$: Observable<number>;
  totalPedidos$: Observable<number>;
  pedidosPagos$: Observable<number>;
  pedidosNaoPagos$: Observable<number>;
  meles;
  baldeImg = produtosImgUrls.honeyBucket;

  constructor(
    private clientesService: ClientesService,
    private pedidosService: PedidosService,
    private produtosService: ProdutosService,
    private estoque: EstoqueService
  ) {}

  ngOnInit(): void {
    this.totalClientes$ = this.clientesService.appClientes$.pipe(
      map((clientes) => clientes.length)
    );

    this.totalPedidos$ = this.pedidosService.fetchAllPedidos().pipe(
      tap((pedidos) => {
        this.saldo$ = of(this.estoque.getSaldo());
        this.pedidosPagos$ = of(pedidos.filter((pedido) => pedido.pago).length);
        this.pedidosNaoPagos$ = of(
          pedidos.filter((pedido) => !pedido.pago).length
        );
      }),
      map((pedidos) => pedidos.length)
    );

    this.meles = this.produtosService.meles;
  }
  ngAfterViewInit() {
    // this.totalClientes = this.clientesService.countClientes();
  }
}
