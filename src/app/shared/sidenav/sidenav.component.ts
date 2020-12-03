import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  opened: boolean;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.layout.sidenavState$.subscribe((state) => {
      this.opened = state;
      console.log(state);
      // this.toggleNav();
    });
  }

  closeNav() {
    console.log('backdropClick');
    this.layout.sidenavState$.next(false);
    // this.opened = false;
  }

  logout() {
    console.log('logged out!');
  }
}
