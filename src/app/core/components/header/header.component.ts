import { Component } from '@angular/core';

@Component({
  selector: 'agb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  nombreUsuario: string = sessionStorage.getItem('username') || '';
}
