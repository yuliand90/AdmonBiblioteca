import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [CommonModule, BooksRoutingModule, SharedModule],
})
export class BooksModule {}
