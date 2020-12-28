import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
  Component,
  EventEmitter,
  HostListener,
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
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
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
  displayedColumns = [];
  dataSource: MatTableDataSource<Pedido>;
  filterOptions = [
    'nomeCliente',
    'dataPedido',
    'previsaoEntrega',
    'status',
    'valor',
  ];
  filterSelect: FormGroup;
  destroySubject$ = new Subject<boolean>();

  @Output()
  newPedidoAdded = new EventEmitter<Pedido>();

  @Output()
  pedidoEdited = new EventEmitter<Pedido>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.displayColumnsBasedOnAvailableWidth();
  }

  constructor(
    private dialog: MatDialog,
    private pedidosService: PedidosService,
    private estoque: EstoqueService
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
    this.onResize();

    this.filterSelect = new FormGroup({
      filter: new FormControl('nomeCliente'),
    });
  }

  loadPedidos() {
    return this.pedidosService
      .fetchAllPedidos()
      .pipe(
        takeUntil(this.destroySubject$),
        tap((data) => {
          this.dataSource = new MatTableDataSource<Pedido>(data);
        }),
        delay(10),
        tap((data) => {
          this.dataSource.filterPredicate = (data, filterValue) => {
            const selectedFilterObj = this.filterSelect.value;
            // ex -> { filter: 'nomeCliente' }

            if (
              selectedFilterObj.filter === 'dataPedido' ||
              selectedFilterObj.filter === 'previsaoEntrega'
            ) {
              const parsedDate = new Date(
                data[selectedFilterObj.filter].seconds * 1000
              );

              // console.log(parsedDate.toLocaleDateString('pt-BR'));

              return parsedDate
                .toLocaleDateString('pt-BR')
                .includes(filterValue);
            } else if (selectedFilterObj.filter === 'valor') {
              return (+data[selectedFilterObj.filter] / 100)
                .toString()
                .includes(filterValue);
            } else {
              return (
                data[selectedFilterObj.filter]
                  .toLowerCase()
                  .trim()
                  .indexOf(filterValue) !== -1
              );
            }
          };
        })
      )
      .subscribe((data) => {});
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

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((result) => {
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

  applyFilter(inputValue) {
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    console.log('destruindo pedidos');
    this.destroySubject$.next(true);
  }

  displayColumnsBasedOnAvailableWidth() {
    const availableWidth = window.innerWidth;
    // console.log(availableWidth);
    availableWidth > 600
      ? (this.displayedColumns = [
          'position',
          'nome',
          'dataPedido',
          'valor',
          'status',
          'previsaoEntrega',
          'pago',
        ])
      : availableWidth > 440
      ? (this.displayedColumns = [
          'nome',
          'dataPedido',
          'valor',
          'status',
          'previsaoEntrega',
          'pago',
        ])
      : availableWidth > 356
      ? (this.displayedColumns = [
          'nome',
          'dataPedido',
          'valor',
          'status',
          'pago',
        ])
      : (this.displayedColumns = ['nome', 'dataPedido', 'valor', 'pago']);
  }
}
