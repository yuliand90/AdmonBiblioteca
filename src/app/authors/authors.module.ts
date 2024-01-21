import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsRoutingModule } from './authors-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CoreModule,
  ],
})
export class AuthorsModule {}
