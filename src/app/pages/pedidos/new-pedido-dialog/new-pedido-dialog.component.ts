import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-pedido-dialog',
  templateUrl: './new-pedido-dialog.component.html',
  styleUrls: ['./new-pedido-dialog.component.scss'],
})
export class NewPedidoDialogComponent implements OnInit {
  pedidoFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get pedidos() {
    return this.pedidoFormGroup.controls['consultas'] as FormArray;
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
}
