import { Injectable } from '@angular/core';
import { produtosImgUrls } from 'src/assets/img.paths';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  public meles = ['laranjeira', 'eucalípto', 'uruçá', 'jataí'];

  public produtos = [
    {
      nome: 'kit degustação',
      pote: 'kit',
      valor: 4000,
      imgPath: produtosImgUrls['kit'],
    },
    {
      nome: 'pote de 150g',
      pote: '150',
      valor: 1800,
      imgPath: produtosImgUrls['150'],
    },
    {
      nome: 'pote de 350g',
      pote: '350',
      valor: 2800,
      imgPath: produtosImgUrls['350'],
    },
    {
      nome: 'pote de 480g',
      pote: '450',
      valor: 3500,
      imgPath: produtosImgUrls['480'],
    },
    {
      nome: 'pote de 780g',
      pote: '780',
      valor: 4800,
      imgPath: produtosImgUrls['780'],
    },
  ];

  constructor() {}
}
