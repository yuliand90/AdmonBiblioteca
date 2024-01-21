import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [CommonModule, AdministrationRoutingModule, SharedModule,MatInputModule
  ],
})
export class AdministrationModule {}
