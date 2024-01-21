import { Component } from '@angular/core';
import Loan from '../../models/loans.model';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interfaces';
import { LoansService } from '../../services/loans.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeypadButton } from 'src/app/shared/interfaces/keypadbutton.interface';
import { environment } from 'src/environments/environment.development';
import { DownloadComponent } from 'src/app/shared/components/download/download.component';
import { FormComponent } from '../../components/form/form/form.component';
@Component({
  selector: 'agb-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  prestamos: Loan[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: 'idPrestamo', title: 'ID' },
    { field: 'id_libro', title: 'LIBRO' },
    { field: 'id_usuario', title: 'ESTUDIANTE' },
    { field: 'fecha_in_pres', title: 'FECHA DE PRESTAMO' },
    { field: 'fecha_dev_lib', title: 'FECHA DE DEVOLUCION' },
    { field: 'accion', title: 'ESTADO' },
  ];
  constructor(
    private _loanService: LoansService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.changePage(0);
    this.loadLoans();
  }

  data: any[] = [];

  totalRecords = this.prestamos.length;
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
    this.data = this.prestamos.slice(skip, skip + pageSize);
  }

  loadLoans() {
    this._loanService.loadLoans().subscribe((data) => {
      this.prestamos = data;
      this.totalRecords = this.prestamos.length;
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
      this.loadLoans();
    });
  }

  delete(idPrestamo: string) {
    const result = this.showMessageConfirm(
      '¿Estas seguro que quieres eliminar este registro ?'
    );
    if (result) {
      this._loanService.deleteLoan(idPrestamo).subscribe((response) => {
        this.showMessage('Registro eliminado correctamente');
        this.loadLoans();
      });
    }
  }
  update(idPrestamo: string) {
    const result = this.showMessageConfirm(
      '¿Estás seguro que quieres devolver este libro?'
    );

    if (result) {
      const loanToUpdate = this.prestamos.find(
        (loan) => loan.idPrestamo === idPrestamo
      );

      if (!loanToUpdate) {
        console.error(`No se encontró el préstamo con ID: ${idPrestamo}`);
        return;
      }

      const today = new Date();

      const updatedLoan = {
        ...loanToUpdate,
        fecha_dev_lib: today,
        accion: 'Devuelto',
      };

      this._loanService
        .updateLoan(idPrestamo, updatedLoan)
        .subscribe((response) => {
          this.showMessage('Libro devuelto correctamente');
          this.loadLoans();
        });
    }
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottonSheet(
          'Lista de Clientes',
          'clientes',
          this.prestamos,
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
  showMessageConfirm(msj: string): boolean {
    var result = false;
    if (confirm(msj)) {
      result = true;
    }
    return result;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 0) {
      this.data = this.prestamos.filter((prestamo) => {
        return (
          prestamo.idPrestamo
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          prestamo.id_libro
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          prestamo.id_usuario
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          prestamo.accion
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      });
    } else {
      this.data = this.prestamos;
    }
  }
}
