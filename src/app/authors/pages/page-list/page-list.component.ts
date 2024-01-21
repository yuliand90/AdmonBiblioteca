import { Component } from '@angular/core';
import { DownloadComponent } from 'src/app/shared/components/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthorsService } from '../../services/authors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from '../../models/authors.model';

@Component({
  selector: 'agb-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  autores: Author[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'cedula', title: 'CEDULA' },
    { field: 'nombre', title: 'NOMBRE' },
    { field: 'apellido', title: 'APELLIDO' },
    { field: 'fecha_Nac', title: 'FECHA NACIMIENTO' },
    { field: 'fecha_Falle', title: 'FECHA DESCENSO' },
    { field: 'nacionalidad', title: 'NACIONALIDAD' },
  ];
  constructor(
    private _authorService: AuthorsService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.changePage(0);
    this.loadAuthors();
  }

  data: any[] = [];

  totalRecords = this.autores.length;
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
    this.data = this.autores.slice(skip, skip + pageSize);
  }

  loadAuthors() {
    this._authorService.loadAuthors().subscribe((data) => {
      this.autores = data;
      this.totalRecords = this.autores.length;
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
      this.loadAuthors();
    });
  }

  delete(cedula: string) {
    const result = this.showMessageConfirm();
    if (result) {
      this._authorService.deleteAuthor(cedula).subscribe((response) => {
        this.showMessage('Registro eliminado correctamente');
        this.loadAuthors();
      });
    }
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottonSheet(
          'Lista de Clientes',
          'clientes',
          this.autores,
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
      this.data = this.autores.filter((autor) => {
        return (
          autor.cedula
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          autor.nombre
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          autor.apellido
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          autor.nacionalidad
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      });
    } else {
      this.data = this.autores;
    }
  }
}
