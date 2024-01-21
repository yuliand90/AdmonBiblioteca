import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
interface IIcon {
  name: string;
  path: string;
}
@Injectable({
  providedIn: 'root',
})
export class IconService {
  private listIcons: IIcon[] = [
    { name: 'logo', path: './../../assets/imagenes/logo.svg' },
    { name: 'avatar', path: './../../assets/imagenes/avatar.svg' },
    {
      name: 'administration',
      path: './../../assets/imagenes/administration.svg',
    },
    { name: 'authors', path: './../../assets/imagenes/authors.svg' },
    { name: 'books', path: './../../assets/imagenes/books.svg' },
    { name: 'home', path: './../../assets/imagenes/home.svg' },
    { name: 'loans', path: './../../assets/imagenes/loans.svg' },
    { name: 'autor1', path: './../../assets/imagenes/autor1.svg' },
    { name: 'seccion', path: './../../assets/imagenes/seccion.svg' },
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registryIcons();
  }
  registryIcons() {
    this.listIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }
}
