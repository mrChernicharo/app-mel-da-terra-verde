import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstoqueService, IMelCompra } from 'src/app/services/estoque.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { produtosImgUrls } from 'src/assets/img.paths';
import { CompraDialogComponent } from './compra-dialog/compra-dialog.component';

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

  @Output()
  novaCompraEmitted = new EventEmitter<IMelCompra>();

  constructor(
    private clientesService: ClientesService,
    private pedidosService: PedidosService,
    private produtosService: ProdutosService,
    private estoque: EstoqueService,
    private dialog: MatDialog
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

  onOpenCompraDialog() {
    const dialogRef = this.dialog.open(CompraDialogComponent, {
      panelClass: 'compra-dialog',
      hasBackdrop: true,
      autoFocus: true,
      data: this.meles,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const compra: IMelCompra = {
          mel: result.mel,
          quantidade: result.quantidade * 1000,
          valor: result.valor,
        };

        this.novaCompraEmitted.emit(compra);
        this.estoque.registerNewCompra(compra);
      }
    });
  }
}
