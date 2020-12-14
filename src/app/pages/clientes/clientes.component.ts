import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, filter, map, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Cliente } from 'src/app/pages/clientes/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { EditClienteDialogComponent } from './edit-cliente-dialog/edit-cliente-dialog.component';
import { NewClienteDialogComponent } from './new-cliente-dialog/new-cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, OnDestroy {
  @Output()
  newClienteAdded = new EventEmitter<Cliente>();

  @Output()
  clienteEdited = new EventEmitter<Cliente>();

  displayedColumns = [
    'position',
    'nome',
    'telefone',
    'dataCadastro',
    'pedidos',
  ];
  dataSource: any;
  destroySubject$ = new Subject<boolean>();

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clientesService.appClientes$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(
        (clientes) =>
          (this.dataSource = new MatTableDataSource<Cliente>(clientes))
      );
  }

  onAddCliente() {
    const dialogRef = this.dialog.open(NewClienteDialogComponent, {
      panelClass: 'new-cliente-dialog',
      hasBackdrop: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newClienteAdded.emit(result);
        this.clientesService.fetchAllClientes().toPromise();
      }
    });
  }

  onEditCliente(clienteId: string) {
    const dialogRef = this.dialog.open(EditClienteDialogComponent, {
      panelClass: 'edit-cliente-dialog',
      hasBackdrop: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clienteEdited.emit(result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    console.log('destroy Clientes');
    this.destroySubject$.next(true);
  }

  // edit
  // this.clientesService.storedClientes.find(cliente => cliente.id === clienteId)
}
