import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Cliente } from '../cliente.model';
// import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor() // private appStore: StoreService
  {}

  searchClientes() {}
}
