import { Component, OnInit } from '@angular/core';
import { Cliente } from './pages/clientes/cliente.model';
import { AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
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
    private clientesService: ClientesService // private afAuth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.clientesService.fetchAllClientes().subscribe((clientes) => {
      console.log(clientes);
    });
  }
}
