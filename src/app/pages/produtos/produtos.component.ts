import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Mel, ProdutosService } from 'src/app/services/produtos.service';
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
    favo: produtosImgUrls['favo'],
  };

  valores = [4000, 1800, 2800, 3500, 4800];
  meles = ['laranjeira', 'eucalípto', 'uruçá', 'jataí'];
  meles$: Observable<Mel[]>;

  bannerImg = TransparentBGBannerUrl;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.meles$ = this.produtosService.getMeles();
  }
}
