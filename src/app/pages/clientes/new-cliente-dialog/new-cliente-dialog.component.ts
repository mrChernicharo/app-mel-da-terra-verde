import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-new-cliente-dialog',
  templateUrl: './new-cliente-dialog.component.html',
  styleUrls: ['./new-cliente-dialog.component.scss'],
})
export class NewClienteDialogComponent implements OnInit {
  newClienteForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<NewClienteDialogComponent>,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.newClienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      telefone: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
  }

  onSubmit() {
    console.log('submit boy');
  }

  saveCliente() {
    this.clientesService.addNewCliente(this.newClienteForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
