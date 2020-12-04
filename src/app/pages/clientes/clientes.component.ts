import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  displayedColumns = ['nome', 'pedidos', 'dataCadastro'];
  dataSource;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.findClientes();
  }
  findClientes() {
    this.clientesService.searchClientes();
  }
}
