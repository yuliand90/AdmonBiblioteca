import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent,
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./home/home.module').then((modulo) => modulo.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./administration/administration.module').then(
        (modulo) => modulo.AdministrationModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'autores',
    loadChildren: () =>
      import('./authors/authors.module').then((modulo) => modulo.AuthorsModule),
    canActivate: [authGuard],
  },
  {
    path: 'libros',
    loadChildren: () =>
      import('./books/books.module').then((modulo) => modulo.BooksModule),
    canActivate: [authGuard],
  },
  {
    path: 'prestamos',
    loadChildren: () =>
      import('./loans/loans.module').then((modulo) => modulo.LoansModule),
    canActivate: [authGuard],
  },
  {
    path: 'secciones',
    loadChildren: () =>
      import('./sections/sections.module').then(
        (modulo) => modulo.SectionsModule
      ),
    canActivate: [authGuard],
  },
  {
    path: ' ',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
