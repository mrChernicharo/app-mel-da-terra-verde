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
import {
  debounceTime,
  delay,
  filter,
  first,
  last,
  map,
  switchMap,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { Cliente } from 'src/app/pages/clientes/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
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

  clientes$: Observable<Cliente[]>;
  // dataSource: any;
  destroySubject$ = new Subject<boolean>();
  selectedCliente: Cliente;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clientes$ = this.clientesService.appClientes$.pipe(
      takeUntil(this.destroySubject$)
      // tap((clientes) => console.log(clientes))
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
    // const dialogRef = this.dialog.open(EditClienteDialogComponent, {
    //   panelClass: 'edit-cliente-dialog',
    //   hasBackdrop: true,
    //   autoFocus: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.clienteEdited.emit(result);
    //   }
    // });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    console.log(filterValue);

    this.clientes$ = this.clientes$.pipe(
      // last(),
      map((clientes) => {
        //
        if (filterValue.length > 0) {
          return clientes.filter((cliente) =>
            cliente.nome.toLowerCase().includes(filterValue)
          );
        } else {
          return clientes;
        }
      }),
      take(1),
      tap((clientes) => {
        // console.log(clientes);
        filterValue = '';
      })
    );
  }

  showClienteDetails(clienteId) {
    console.log(clienteId);

    this.clientes$.subscribe(
      (clientes) =>
        (this.selectedCliente = clientes.find(
          (cliente) => cliente.id === clienteId
        ))
    );
    console.log(this.selectedCliente);
  }

  ngOnDestroy() {
    console.log('destroy Clientes');
    this.destroySubject$.next(true);
  }

  // edit
  // this.clientesService.storedClientes.find(cliente => cliente.id === clienteId)
}
