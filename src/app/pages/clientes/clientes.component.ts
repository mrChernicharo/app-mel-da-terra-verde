import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { Cliente } from 'src/app/pages/clientes/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { EditClienteDialogComponent } from './edit-cliente-dialog/edit-cliente-dialog.component';
import { NewClienteDialogComponent } from './new-cliente-dialog/new-cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, AfterViewInit {
  dataSource$: Observable<Cliente[]>;
  displayedColumns = [
    'position',
    'nome',
    'telefone',
    'dataCadastro',
    'pedidos',
  ];
  @Output()
  newClienteAdded = new EventEmitter<Cliente>();

  @Output()
  clienteEdited = new EventEmitter<Cliente>();
  dataSource;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClientes().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Cliente>(data);
    });
  }

  ngAfterViewInit() {}

  loadClientes() {
    return this.clientesService.searchAllClientes();
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddCliente() {
    this.openNewClienteDialog();
  }

  openNewClienteDialog() {
    const dialogRef = this.dialog.open(NewClienteDialogComponent, {
      panelClass: 'new-cliente-dialog',
      hasBackdrop: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newClienteAdded.emit(result);
    });
  }

  onEditCliente(id) {
    this.openEditClienteDialog(id);
  }

  openEditClienteDialog(clienteId: string) {
    const dialogRef = this.dialog.open(EditClienteDialogComponent, {
      panelClass: 'edit-cliente-dialog',
      hasBackdrop: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.clienteEdited.emit(result);
    });
  }

  // addCliente() {
  //   this.clientesService.addNewClient();
  // }

  // edit
  // this.clientesService.storedClientes.find(cliente => cliente.id === clienteId)
}
