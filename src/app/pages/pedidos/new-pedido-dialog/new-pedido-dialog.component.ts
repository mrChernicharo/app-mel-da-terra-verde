import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  nextWeek = new Date(new Date().getTime() * 24 * 60 * 60 * 1000 * 6);

  constructor(
    private dialogRef: MatDialogRef<NewPedidoDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private pedidosService: PedidosService
  ) {}

  get produtos() {
    return this.pedidoFormGroup.get('produtos') as FormArray;
  }

  ngOnInit(): void {
    this.createPedidoForm();
  }

  createPedidoForm() {
    return (this.pedidoFormGroup = this.formBuilder.group({
      nomeCliente: new FormControl(),
      dataPedido: new FormControl(),
      previsaoEntrega: new FormControl(),
      desconto: new FormControl(),
      produtos: this.formBuilder.array([]),
      valor: 0,
    }));
  }

  newProdutoFormGroup() {
    return this.formBuilder.group({
      mel: new FormControl(),
      pote: new FormControl(),
      quantidade: new FormControl(),
    });
  }

  onAddProduto() {
    return this.produtos.push(this.newProdutoFormGroup());
  }

  onDeleteProduto(index: number) {
    return this.produtos.removeAt(index);
  }

  getProdutosControls() {
    return this.produtos.controls;
  }

  savePedido() {
    this.pedidoFormGroup.get('valor').setValue(this.getPedidoTotalValue());

    this.pedidosService.addNewPedido(this.pedidoFormGroup.value);
    this.dialogRef.close(this.pedidoFormGroup.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

  getPedidoTotalValue() {
    return this.produtos.controls.reduce((acc, next) => {
      switch (next.get('pote').value) {
        case 'kit':
          return acc + 4000 * next.get('quantidade').value;
        case '150':
          return acc + 1800 * next.get('quantidade').value;
        case '350':
          return acc + 2800 * next.get('quantidade').value;
        case '480':
          return acc + 3500 * next.get('quantidade').value;
        case '780':
          return acc + 4800 * next.get('quantidade').value;
        default:
          return acc + 0;
      }
    }, 0);
  }
}
