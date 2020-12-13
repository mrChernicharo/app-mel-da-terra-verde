import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-new-pedido-dialog',
  templateUrl: './new-pedido-dialog.component.html',
  styleUrls: ['./new-pedido-dialog.component.scss'],
})
export class NewPedidoDialogComponent implements OnInit {
  pedidoFormGroup: FormGroup;
  today = new Date();
  nextWeek = new Date().getTime() * 24 * 60 * 60 * 1000 * 6;

  constructor(
    private dialogRef: MatDialogRef<NewPedidoDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private pedidosService: PedidosService
  ) {}

  get pedidos() {
    return this.pedidoFormGroup.controls['pedidos'] as FormArray;
  }

  ngOnInit(): void {
    this.pedidoFormGroup = this.formBuilder.group({
      nomeCliente: new FormControl(),
      dataPedido: new FormControl(),
      previsaoEntrega: new FormControl(),
      desconto: new FormControl(),
      produtos: this.formBuilder.array([]),
    });
  }

  savePedido() {
    console.log(this.pedidoFormGroup.value);

    // this.pedidosService
  }

  onCancel() {
    this.dialogRef.close();
  }
}
