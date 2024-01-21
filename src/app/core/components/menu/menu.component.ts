import { Component, EventEmitter, Output } from '@angular/core';
import { IMenu, MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'agb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  listMenu: IMenu[];
  expanded = true;
  filteredMenu: IMenu[];
  @Output() onToggleExpanded: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private menuService: MenuService) {
    this.listMenu = menuService.getMenu();
    this.filteredMenu = []; // Asignar un valor vacío en el constructor
    this.filterMenu();
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.onToggleExpanded.emit(this.expanded);
  }

  filterMenu() {
    const userRoleFromSession = sessionStorage.getItem('userrole');
    this.filteredMenu = this.listMenu.filter(
      (menu) =>
        !!userRoleFromSession &&
        !!menu.allowedRoles &&
        menu.allowedRoles.includes(userRoleFromSession)
    );
  }
}
