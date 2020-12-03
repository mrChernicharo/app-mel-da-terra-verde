import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input('app-title') title: string;
  public isSidenavOpen = false;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.layout.sidenavState$.subscribe((state) => {
      this.isSidenavOpen = state;
    });
  }

  onToggleSidenav(event) {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.layout.sidenavState$.next(this.isSidenavOpen);
  }
}
