import { Component } from '@angular/core';
import { DownloadComponent } from 'src/app/shared/components/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../../components/form/form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BooksService } from '../../services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../../models/books.model';

@Component({
  selector: 'agb-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  libros: Book[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'idlibros', title: 'ID' },
    { field: 'titulo', title: 'TITULO' },
    { field: 'autor_per', title: 'AUTOR' },
    { field: 'genero_per', title: 'GENERO' },
    { field: 'estado_conser', title: 'ESTADO' },
    { field: 'seccion_per', title: 'SECCIÓN' },
    { field: 'disponibilidad', title: 'DISPONIBILIDAD' },
    { field: 'descripcion', title: 'DESCRIPCION' },
  ];
  constructor(
    private _boookService: BooksService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadBooks();
  }

  data: any[] = [];

  totalRecords = this.libros.length;
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
    this.data = this.libros.slice(skip, skip + pageSize);
  }

  loadBooks() {
    this._boookService.loadBooks().subscribe((data) => {
      this.libros = data;
      this.totalRecords = this.libros.length;
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
      this.loadBooks();
    });
  }

  delete(idlibros: string) {
    const result = this.showMessageConfirm();
    if (result) {
      this._boookService.deleteBook(idlibros).subscribe((response) => {
        this.showMessage('Registro eliminado correctamente');
        this.loadBooks();
      });
    }
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottonSheet(
          'Lista de Clientes',
          'clientes',
          this.libros,
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
      this.data = this.libros.filter((libro) => {
        return (
          libro.idlibros
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          libro.titulo
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          libro.autor_per
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          libro.genero_per
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          libro.estado_conser
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          libro.seccion_per
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          libro.disponibilidad
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      });
    } else {
      this.data = this.libros;
    }
  }
}
