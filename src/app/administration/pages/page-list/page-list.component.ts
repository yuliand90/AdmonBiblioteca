import { Component } from '@angular/core';
import { DownloadComponent } from 'src/app/shared/components/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AdministrationService } from '../../services/administration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Administration } from '../../models/administration.model';

@Component({
  selector: 'agb-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  administradores: Administration[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'cedula', title: 'CEDULA' },
    { field: 'nombre', title: 'NOMBRE' },
    { field: 'apellido', title: 'APELLIDO' },
    { field: 'direccion', title: 'DIRECCION' },
    { field: 'celular', title: 'CELULAR' },
    { field: 'username', title: 'USUARIO' },
    { field: 'password', title: 'CONTRASEÑA' },
    { field: 'rol', title: 'ROL' },
  ];
  constructor(
    private _administrationService: AdministrationService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.changePage(0);
    this.loadAdministrador();
  }
  data: any[] = [];

  totalRecords = this.administradores.length;
  keypadButtons: KeypadButton[] = [
    {
      icon: 'cloud_download',
      tooltip: 'EXPORTAR',
      color: 'accent',
      action: 'DOWNLOAD',
    },
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.administradores.slice(skip, skip + pageSize);
  }

  loadAdministrador() {
    this._administrationService.loadAdministrator().subscribe((data) => {
      this.administradores = data;
      this.totalRecords = this.administradores.length;
      this.changePage(0);
    });
  }

  openForm(row: any = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row,
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(
      FormComponent,
      options
    );
    reference.afterClosed().subscribe((response) => {
      this.loadAdministrador();
    });
  }

  delete(cedula: string) {
    const result = this.showMessageConfirm();
    if (result) {
      this._administrationService
        .deleteAdministrator(cedula)
        .subscribe((response) => {
          this.showMessage('Registro eliminado correctamente');
          this.loadAdministrador();
        });
    }
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottonSheet(
          'Lista de Clientes',
          'clientes',
          this.administradores,
          this.metaDataColumns
        );
        break;
      case 'NEW':
        this.openForm();
        break;
    }
  }

  showBottonSheet(
    title: string,
    fileName: string,
    data: any,
    metaDataColumn: MetaDataColumn[]
  ) {
    this.bottomSheet.open(DownloadComponent, {
      data: { data: data, metaDataColumn: metaDataColumn },
    });
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
  showMessageConfirm(): boolean {
    var result = false;
    if (confirm('¿Está seguro de eliminar el registro?')) {
      result = true;
    }
    return result;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 0) {
      this.data = this.administradores.filter((administrador) => {
        return (
          administrador.cedula
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          administrador.nombre
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          administrador.apellido
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          administrador.direccion
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          administrador.rol
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      });
    } else {
      this.data = this.administradores;
    }
  }
}
