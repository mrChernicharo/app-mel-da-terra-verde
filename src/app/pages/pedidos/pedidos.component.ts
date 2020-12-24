import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_SCROLL_STRATEGY_FACTORY,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { EstoqueService } from 'src/app/services/estoque.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NewPedidoDialogComponent } from '../pedidos/new-pedido-dialog/new-pedido-dialog.component';
import { EditPedidoDialogComponent } from './edit-pedido-dialog/edit-pedido-dialog.component';
import { Pedido } from './pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'position',
    'nome',
    'dataPedido',
    'status',
    'previsaoEntrega',
    'valor',
    'pago',
  ];
  dataSource: MatTableDataSource<Pedido>;
  filterOptions = ['nome', 'data pedido', 'previsao entrega', 'status'];
  filterSelect: FormGroup;

  @Output()
  newPedidoAdded = new EventEmitter<Pedido>();

  @Output()
  pedidoEdited = new EventEmitter<Pedido>();

  constructor(
    private dialog: MatDialog,
    private pedidosService: PedidosService,
    private estoque: EstoqueService
  ) {}

  ngOnInit(): void {
    this.loadPedidos();

    this.filterSelect = new FormGroup({
      filter: new FormControl('nome'),
    });
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
      minWidth: 360,
      // scrollStrategy:
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newPedidoAdded.emit(result);
        this.loadPedidos();
      }
    });
  }

  openEditDialog(row) {
    console.log(row);

    const pedidoId = row.id;
    console.log(pedidoId);

    const dialogRef = this.dialog.open(EditPedidoDialogComponent, {
      panelClass: 'edit-pedido-dialog',
      hasBackdrop: true,
      autoFocus: true,
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pedidoEdited.emit(result);
        this.loadPedidos();
      }
    });
  }

  applyFilter(event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = inputValue.trim().toLowerCase();

    // this.dataSource.filterPredicate()
  }

  ngOnDestroy() {}
}
