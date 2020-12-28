import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { NewPedidoDialogComponent } from '../new-pedido-dialog/new-pedido-dialog.component';
import { Pedido } from '../pedido.model';
import { IServerTimestamp } from 'src/app/shared/server-timestamp.pipe';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-pedido-dialog',
  templateUrl: './edit-pedido-dialog.component.html',
  styleUrls: ['./edit-pedido-dialog.component.scss'],
})
export class EditPedidoDialogComponent implements OnInit, AfterViewInit {
  editPedidoForm: FormGroup;
  allStatus = ['pendente', 'preparado', 'a caminho', 'entregue'];
  dataEntrega: Date;
  constructor(
    private dialogRef: MatDialogRef<NewPedidoDialogComponent>,
    private formBuilder: FormBuilder,
    private pedidosService: PedidosService,
    @Inject(MAT_DIALOG_DATA) public data: Pedido // private router: Router, // private clientesService: ClientesService, // private produtosService: ProdutosService,
  ) {}

  ngOnInit(): void {
    this.dataEntrega = new Date(
      (this.data.previsaoEntrega as IServerTimestamp).seconds * 1000
    );

    console.log(this.data);
    this.editPedidoForm = this.formBuilder.group({
      status: new FormControl(this.data.status),
      previsaoEntrega: new FormControl(this.dataEntrega),
      pago: new FormControl(this.data.pago),
    });
  }

  ngAfterViewInit() {}

  // createEditForm() {
  // }

  saveChanges() {
    console.log(this.editPedidoForm.value);

    this.pedidosService
      .updatePedido(this.data.id, this.editPedidoForm.value)
      .pipe(delay(200))
      .subscribe(() => this.dialogRef.close(this.editPedidoForm.value));

    this.dialogRef.close(this.editPedidoForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
