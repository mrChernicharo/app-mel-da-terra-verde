import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-compra-dialog',
  templateUrl: './compra-dialog.component.html',
  styleUrls: ['./compra-dialog.component.scss'],
})
export class CompraDialogComponent implements OnInit {
  compraForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public meles: string[],
    private dialogRef: MatDialogRef<CompraDialogComponent>,
    private estoque: EstoqueService
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
}
