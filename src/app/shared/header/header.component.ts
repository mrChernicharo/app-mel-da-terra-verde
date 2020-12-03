import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input('app-title') title;
  public isSidenavOpen = false;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {}

  onToggleSidenav(event) {
    this.layout.sidenavState$.next(!this.isSidenavOpen);
    // this.isSidenavOpen = !this.isSidenavOpen;
    // console.log(this.isSidenavOpen);
  }
}
