import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'agb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  isMenuRequired = false;
  isHeaderRequired = false;
  constructor(private router: Router) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login') {
      this.isHeaderRequired = false;
    } else {
      this.isHeaderRequired = true;
    }
    if (currentUrl == '/login') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
      this.abrir = true;
    }
  }
  expanded = true;
  showMenu = true;
  abrir = false;

  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }
}
