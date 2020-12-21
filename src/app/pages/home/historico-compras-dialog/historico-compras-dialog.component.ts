import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMelCompra } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-historico-compras-dialog',
  templateUrl: './historico-compras-dialog.component.html',
  styleUrls: ['./historico-compras-dialog.component.scss'],
})
export class HistoricoComprasDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IMelCompra[]) {}

  ngOnInit(): void {}
}
