import { Component, OnInit } from '@angular/core';
import { Produto } from './produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  // produto: Produto;
  potes = ['kit', '150', '350', '480', '780'];
  valores = [4000, 1800, 2800, 3500, 4800];
  meles = ['laranjeira', 'eucalípto', 'uruçá', 'jataí'];
  constructor() {}

  ngOnInit(): void {
    // this.produto = {
    //   mel: 'silvestre',
    //   pote: 'kit',
    //   valor: 4000,
    // };
  }
}
