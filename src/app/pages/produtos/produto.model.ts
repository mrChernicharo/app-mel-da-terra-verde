export class Produto {
  mel: string;
  pote: 'kit' | '150' | '350' | '480' | '780';
  valor: 4000 | 1800 | 2800 | 3500 | 4800;
  quantidade: number;
  // get valor() {
  // switch (this.pote) {
  //   case 'kit':
  //     return 4000;
  //   case '150':
  //     return 1800;
  //   case '350':
  //     return 2800;
  //   case '480':
  //     return 3500;
  //   case '780':
  //     return 4800;
  //   default:
  //     break;
  // }
  // }
}
