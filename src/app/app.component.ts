import { AfterViewInit, Component, OnInit } from '@angular/core';
import { combineLatest, from, Observable, of } from 'rxjs';
import { delay, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { Cliente } from './pages/clientes/cliente.model';
import { Pedido } from './pages/pedidos/pedido.model';
import { AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
import { EstoqueService, IMelCompra } from './services/estoque.service';
import { PedidosService } from './services/pedidos.service';
// var admin = require('firebase-admin');

// import {serviceAccount} from 'mel-da-terra-verde-app-firebase-adminsdk-uc2at-d9b3b2e101.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public title = 'Mel da Terra Verde';
  pedidos$: Observable<Pedido[]>;
  melCompras$: Observable<IMelCompra[]>;

  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private estoque: EstoqueService // private afAuth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.clientesService.fetchAllClientes().subscribe((clientes) => {
      // console.log(clientes);
    });

    this.pedidos$ = this.pedidosService
      .fetchAllPedidos()
      .pipe(shareReplay(), startWith([]));

    this.melCompras$ = this.estoque
      .getCompras()
      .pipe(shareReplay(), startWith([]));

    this.pedidos$.subscribe(() => console.log('pedidos changed'));
    this.melCompras$.subscribe(() => console.log('compras changed'));

    combineLatest([this.pedidos$, this.melCompras$])
      .pipe(
        tap(),
        map(([pedidos, compras]) => {
          return { pedidos, compras };
        }),
        tap((data) => {
          this.estoque._setEstoqueBruto(data.pedidos, data.compras);
          this.estoque._setSaldo(data.pedidos, data.compras);
        })
      )
      .subscribe(() => console.log('appComponent trabalhando'));
  }
  ngAfterViewInit() {}
}
