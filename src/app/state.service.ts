import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

Injectable({
  providedIn: 'root'
})
export class StateService{
  clientes$: Observable<Cliente>

  constructor() {}
}
