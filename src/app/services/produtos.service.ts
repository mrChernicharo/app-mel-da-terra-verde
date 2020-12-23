import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { produtosImgUrls } from 'src/assets/img.paths';

export interface Mel {
  id?: string;
  nome: string;
}

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
      pote: '480',
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

  constructor(private db: AngularFirestore) {}

  getMeles(): Observable<Mel[]> {
    return this.db
      .collection<Mel>('meles')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => snap.payload.doc.data());
        }),
        tap((meles) => console.log(meles))
      );
  }

  addNewMel(nome: string) {
    this.db
      .collection('meles')
      .add({ nome })
      .then((doc) => {
        console.log(doc.id);
        const changes = { id: doc.id };
        this.db.doc(`meles/${doc.id}`).update(changes);
      });
  }
}
