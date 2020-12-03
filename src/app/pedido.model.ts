import { Produto } from './produto.model';

export type StatusPedido = 'pendente' | 'entregue' | 'cancelado';

export class Pedido {
  id: string;
  dataPedido: Date;
  previsaoEntrega: Date;
  status: StatusPedido;
  produtos: Produto[];
  valor: number;
  pago: boolean;
  desconto?: number;
}
