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
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-compra-dialog',
  templateUrl: './compra-dialog.component.html',
  styleUrls: ['./compra-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompraDialogComponent implements OnInit {
  compraForm: FormGroup;
  @ViewChild('inputOption') optInput: MatFormField;

  constructor(
    @Inject(MAT_DIALOG_DATA) public meles: string[],
    private dialogRef: MatDialogRef<CompraDialogComponent>,
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
      // const formFieldEl = document.getElementById('mel-form-field');
      // console.log(formFieldEl);
      this.compraForm.get('mel').patchValue(inputValue);
    }
  }
}
