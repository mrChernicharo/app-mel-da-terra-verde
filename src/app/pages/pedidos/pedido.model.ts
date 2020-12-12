import { Produto } from '../produtos/produto.model';

export type StatusPedido = 'pendente' | 'entregue' | 'cancelado';

export class Pedido {
  id?: string;
  idCliente: string;
  nomeCliente: string;
  dataPedido: Date;
  previsaoEntrega: Date;
  status: StatusPedido;
  produtos: Produto[];
  valor: number;
  pago: boolean;
  desconto?: number;

  getValor(): number {
    return this.produtos.reduce((initial, next) => initial + next.valor, 0);
  }
}
