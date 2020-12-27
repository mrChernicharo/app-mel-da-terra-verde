import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  take,
  tap,
} from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';
import { EstoqueService } from 'src/app/services/estoque.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Mel, ProdutosService } from 'src/app/services/produtos.service';

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
  clientesNames$: Observable<string[]>;
  meles$: Observable<Mel[]>;
  potes: string[];
  potesNames: string[];
  valorTotal$: Observable<number>;
  selectedClienteId: string = '';

  constructor(
    private dialogRef: MatDialogRef<NewPedidoDialogComponent>,
    private formBuilder: FormBuilder,
    private estoque: EstoqueService,
    private zone: NgZone,
    private router: Router,
    private cd: ChangeDetectorRef,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService
  ) {
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

    this.meles$ = this.produtosService.getMeles();

    this.clientesNames$ = this.clientesService.appClientes$.pipe(
      map((clientes) => {
        return clientes.map((cliente) => cliente.nome);
      })
    );

    this.valorTotal$ = of(this.getPedidoTotalValue());

    // console.log(this.clientes);
  }

  createPedidoForm() {
    return (this.pedidoFormGroup = this.formBuilder.group({
      nomeCliente: new FormControl('', Validators.required),
      idCliente: new FormControl(''),
      dataPedido: new FormControl('', Validators.required),
      previsaoEntrega: new FormControl('', Validators.required),
      desconto: new FormControl(0),
      produtos: this.formBuilder.array([]),
      valor: 0,
    }));
  }

  newProdutoFormGroup() {
    return this.formBuilder.group({
      pote: new FormControl('', Validators.required),
      quantidade: new FormControl(1, Validators.required),
      mel: new FormControl('', Validators.required),
      valor: new FormControl(''),
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

  setClienteId() {
    return this.clientesService.appClientes$.pipe(
      map((clientes) => {
        return clientes.filter(
          (cliente) =>
            cliente.nome.toLowerCase().trim() ===
            this.pedidoFormGroup.get('nomeCliente').value.toLowerCase().trim()
        );
      }),
      map((clientes) => (clientes ? clientes[0].id : '')),
      tap((id) => this.pedidoFormGroup.get('idCliente').setValue(id))
    );
  }

  setValorProduto(index: number) {
    // console.log(index);
    const descount = this.pedidoFormGroup.get('desconto').value / 100;

    const formGroup = this.getProdutosControls()[index];

    let pote: string = formGroup.get('pote').value || '_';
    let quantidade = formGroup.get('quantidade').value || 1;
    let poteValue: number;

    switch (pote) {
      case 'kit':
        poteValue = 4000;
        break;
      case '150':
        poteValue = 1800;
        break;

      case '350':
        poteValue = 2800;
        break;

      case '480':
        poteValue = 3500;
        break;

      case '780':
        poteValue = 4800;
        break;

      case '_':
        poteValue = 0;
        break;

      default:
        poteValue = 0;
        break;
    }

    const value = poteValue * +quantidade * (1 - descount);
    formGroup.get('valor').setValue(value / 100);
    this.valorTotal$ = of(this.getPedidoTotalValue());
  }

  setAllProdutosValues(event: InputEvent) {
    fromEvent(event.target, 'input')
      .pipe(
        debounceTime(400),
        // delay(100),
        // take(1),
        // distinctUntilChanged(),
        tap((event) => {
          const run = () => {
            console.log(
              'produtosLength = ' + this.getProdutosControls().length
            );
            for (let i = 0; i < this.getProdutosControls().length; i++) {
              this.setValorProduto(i);
            }
          };
          run();
        }),
        catchError((err) => throwError(err))
      )
      .toPromise();
  }

  savePedido() {
    this.setClienteId().subscribe((id) => (this.selectedClienteId = id));

    this.pedidoFormGroup.get('valor').setValue(this.getPedidoTotalValue());

    this.pedidosService.addNewPedido(this.pedidoFormGroup.value);
    // this.estoque.getSaldo();

    this.dialogRef.close(this.pedidoFormGroup.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

  getPedidoTotalValue() {
    const descount = this.pedidoFormGroup.get('desconto').value / 100;
    console.log(descount);
    return this.getProdutosControls().reduce((acc, next) => {
      switch (next.get('pote').value) {
        case 'kit':
          return (acc += 4000 * next.get('quantidade').value * (1 - descount));
        case '150':
          return (acc += 1800 * next.get('quantidade').value * (1 - descount));
        case '350':
          return (acc += 2800 * next.get('quantidade').value * (1 - descount));
        case '480':
          return (acc += 3500 * next.get('quantidade').value * (1 - descount));
        case '780':
          return (acc += 4800 * next.get('quantidade').value * (1 - descount));
        default:
          return (acc += 0);
      }
    }, 0);
  }
}
