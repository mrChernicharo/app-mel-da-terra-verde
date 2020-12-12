import { Pedido } from '../pedidos/pedido.model';

// export interface Endereco {
//   rua: string;
//   numero: string;
//   complemento: string;
//   bairro: string;
//   cep: string;
// }

export class Cliente {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: Date;
  atualizadoEm: Date;
  pedidos?: Pedido[];
  // endereco?: Endereco;
}
