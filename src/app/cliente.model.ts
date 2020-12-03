import { Pedido } from './pedido.model';

export class Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: Date;
  pedidos: Pedido[];
}
