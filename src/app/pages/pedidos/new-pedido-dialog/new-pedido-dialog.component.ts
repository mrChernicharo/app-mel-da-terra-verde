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
import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-new-pedido-dialog',
  templateUrl: './new-pedido-dialog.component.html',
  styleUrls: ['./new-pedido-dialog.component.scss'],
})
export class NewPedidoDialogComponent implements OnInit {
  pedidoFormGroup: FormGroup;
  today = new Date();
  nextWeek = new Date(new Date().getTime() * 24 * 60 * 60 * 1000 * 6);
  clientes: string[];
  meles: string[];
  potes: string[];
  potesNames: string[];

  constructor(
    private dialogRef: MatDialogRef<NewPedidoDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService
  ) {
    this.meles = this.produtosService.meles;
    this.potes = this.produtosService.produtos.map((produto) => produto.pote);
    this.potesNames = this.produtosService.produtos.map(
      (produto) => produto.nome
    );
  }

  get produtos() {
    return this.pedidoFormGroup.get('produtos') as FormArray;
  }

  ngOnInit(): void {
    this.createPedidoForm();
    this.clientes = this.clientesService.storedClientes.map(
      (cliente) => cliente.nome
    );
    console.log(this.clientes);
  }

  createPedidoForm() {
    return (this.pedidoFormGroup = this.formBuilder.group({
      nomeCliente: new FormControl('', Validators.required),
      dataPedido: new FormControl('', Validators.required),
      previsaoEntrega: new FormControl('', Validators.required),
      desconto: new FormControl(),
      produtos: this.formBuilder.array([]),
      valor: 0,
    }));
  }

  newProdutoFormGroup() {
    return this.formBuilder.group({
      mel: new FormControl('', Validators.required),
      pote: new FormControl('', Validators.required),
      quantidade: new FormControl('', Validators.required),
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
    const descount = this.pedidoFormGroup.get('desconto').value / 100;
    console.log(descount);
    return this.produtos.controls.reduce((acc, next) => {
      switch (next.get('pote').value) {
        case 'kit':
          return acc + 4000 * next.get('quantidade').value * (1 - descount);
        case '150':
          return acc + 1800 * next.get('quantidade').value * (1 - descount);
        case '350':
          return acc + 2800 * next.get('quantidade').value * (1 - descount);
        case '480':
          return acc + 3500 * next.get('quantidade').value * (1 - descount);
        case '780':
          return acc + 4800 * next.get('quantidade').value * (1 - descount);
        default:
          return acc + 0;
      }
    }, 0);
  }
}
