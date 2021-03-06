import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { EstoqueService } from 'src/app/services/estoque.service';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-compra-dialog',
  templateUrl: './compra-dialog.component.html',
  styleUrls: ['./compra-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompraDialogComponent implements OnInit {
  compraForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public meles: string[],
    private dialogRef: MatDialogRef<CompraDialogComponent>,
    private produtosService: ProdutosService,
    private estoque: EstoqueService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.compraForm = new FormGroup({
      mel: new FormControl('', Validators.required),
      quantidade: new FormControl(0, Validators.required),
      valor: new FormControl(0, Validators.required),
    });
  }

  saveCompra() {
    // console.log(this.compraForm.value);
    this.dialogRef.close(this.compraForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

  addNewMel(event) {
    const inputValue: string = event.target.value;

    if (inputValue.length > 0) {
      this.meles.push(inputValue);

      this.compraForm.get('mel').patchValue(inputValue);

      this.produtosService.addNewMel(inputValue);
    }
  }
}
