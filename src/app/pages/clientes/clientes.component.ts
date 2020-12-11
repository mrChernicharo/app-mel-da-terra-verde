import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Cliente } from 'src/app/pages/clientes/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'position',
    'nome',
    'telefone',
    'dataCadastro',
    'pedidos',
  ];
  dataSource$: Observable<Cliente[]>;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.dataSource$ = this.findClientes();
  }

  ngAfterViewInit() {
    this.findClientes();
  }

  findClientes() {
    return this.clientesService.searchClientes();
  }

  onAddCliente() {
    this.openNewClienteDialog();
  }

  openNewClienteDialog() {
    console.log('Abra-te Séssamo!');
  }

  // addCliente() {
  //   this.clientesService.addNewClient();
  // }
}
