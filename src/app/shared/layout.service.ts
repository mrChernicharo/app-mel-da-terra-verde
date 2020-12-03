import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public sidenavState$ = new BehaviorSubject(false);
  // private toggleSidenav$ = this.sidenavState$.asObservable();
  constructor() {}
}
