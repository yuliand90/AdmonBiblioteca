import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoansRoutingModule } from './loans-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { CoreModule } from '../core/core.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormComponent } from './components/form/form/form.component';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [
    CommonModule,
    LoansRoutingModule,
    SharedModule,
    CoreModule,
    MatDatepickerModule,
  ],
})
export class LoansModule {}
