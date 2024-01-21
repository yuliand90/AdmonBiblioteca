import { Injectable } from '@angular/core';
export interface IMenu {
  title: string;
  icon: string;
  url: string;
  allowedRoles: string[];
}
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private listMenu: IMenu[] = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home',
      allowedRoles: ['Administrador', 'Estudiante'],
    },
    {
      title: 'Administración',
      url: '/administracion',
      icon: 'administration',
      allowedRoles: ['Administrador'],
    },
    {
      title: 'Autores',
      url: '/autores',
      icon: 'authors',
      allowedRoles: ['Administrador'],
    },
    {
      title: 'Secciones',
      url: '/secciones',
      icon: 'seccion',
      allowedRoles: ['Administrador'],
    },
    {
      title: 'Libros',
      url: '/libros',
      icon: 'books',
      allowedRoles: ['Administrador'],
    },
    {
      title: 'Prestamos',
      url: '/prestamos',
      icon: 'loans',
      allowedRoles: ['Administrador'],
    },
  ];
  constructor() {}
  getMenu(): IMenu[] {
    return [...this.listMenu];
  }
  getMenuByUrl(url: string): IMenu {
    return this.listMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
