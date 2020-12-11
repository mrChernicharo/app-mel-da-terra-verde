import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Cliente } from 'src/app/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nome', 'dataCadastro', 'pedidos'];
  dataSource;
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

  // addCliente() {
  //   this.clientesService.addNewClient();
  // }
}
