import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Cliente } from './pages/clientes/cliente.model';
import { AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
import { EstoqueService } from './services/estoque.service';
import { PedidosService } from './services/pedidos.service';
// var admin = require('firebase-admin');

// import {serviceAccount} from 'mel-da-terra-verde-app-firebase-adminsdk-uc2at-d9b3b2e101.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Mel da Terra Verde';

  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private estoqueService: EstoqueService // private afAuth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.clientesService.fetchAllClientes().subscribe((clientes) => {
      console.log(clientes);
    });

    this.pedidosService
      .fetchAllPedidos()
      .pipe(tap((pedidos) => this.estoqueService._setSaldo(pedidos)))
      .subscribe((pedidos) => console.log(this.estoqueService.getSaldo()));

    // this.estoqueService._setEstoqueBruto()
  }
}
