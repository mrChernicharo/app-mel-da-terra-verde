import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NewPedidoDialogComponent } from './new-pedido-dialog/new-pedido-dialog.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  displayedColumns = [];
  dataSource;
  constructor(
    // private dialogRef: MatDialogRef<NewPedidoDialogComponent>,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos() {
    this.pedidosService.fetchAllPedidos();
  }
  applyFilter(event) {}

  onAddPedido() {}
}
