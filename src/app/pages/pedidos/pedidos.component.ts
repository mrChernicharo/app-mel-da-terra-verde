import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NewPedidoDialogComponent } from '../pedidos/new-pedido-dialog/new-pedido-dialog.component';
import { Pedido } from './pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  displayedColumns = [
    'position',
    'nome',
    'dataPedido',
    'status',
    'previsaoEntrega',
    'valor',
    'pago',
  ];
  dataSource: any;

  @Output()
  newPedidoAdded = new EventEmitter<Pedido>();

  constructor(
    private dialog: MatDialog,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos() {
    return this.pedidosService
      .fetchAllPedidos()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource<Pedido>(data))
      );
  }

  onAddPedido() {
    this.openNewPedidoDialog();
  }

  openNewPedidoDialog() {
    const dialogRef = this.dialog.open(NewPedidoDialogComponent, {
      panelClass: 'new-pedido-dialog',
      hasBackdrop: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newPedidoAdded.emit(result);
        this.loadPedidos();
      }
    });
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
