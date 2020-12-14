import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { produtosImgUrls, TransparentBGBannerUrl } from 'src/assets/img.paths';
import { Produto } from './produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  potes = ['kit', '150', '350', '480', '780'];
  prodImgs = {
    kit: produtosImgUrls['kit'],
    '150': produtosImgUrls['150'],
    '350': produtosImgUrls['350'],
    '480': produtosImgUrls['480'],
    '780': produtosImgUrls['780'],
  };

  valores = [4000, 1800, 2800, 3500, 4800];
  meles = ['laranjeira', 'eucalípto', 'uruçá', 'jataí'];

  bannerImg = TransparentBGBannerUrl;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {}
}
