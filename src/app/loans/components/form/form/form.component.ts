import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministrationService } from 'src/app/administration/services/administration.service';
import { BooksService } from 'src/app/books/services/books.service';
import { LoansService } from 'src/app/loans/services/loans.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'agb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  emp_form: FormGroup;
  title = '';
  isEdit: boolean;
  estados: string[] = ['Rentado', 'Devuelto'];
  libros: any[] = [];
  estudiantes: any[] = [];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private loanService: LoansService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private _administrationService: AdministrationService,
    private _booksService: BooksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR PRÉSTAMO' : 'NUEVO PRÉSTAMO';
    this.isEdit = !!data;

    this.emp_form = this.formBuilder.group({
      id_libro: [
        this.data?.id_libro,
        [Validators.pattern('^[0-9]*$'), Validators.required],
      ],
      id_usuario: [
        this.data?.id_usuario,
        [Validators.pattern('^[0-9]*$'), Validators.required],
      ],
      fecha_in_pres: [this.data?.fecha_in_pres, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadAdministration();
    this.loadBooks();
  }

  loadAdministration() {
    this._administrationService.loadAdministrationInfo().subscribe(
      (estudiantes: any[]) => {
        this.estudiantes = estudiantes.map((estudiante) => ({
          value: estudiante.cedula,
          text: estudiante.cedula,
        }));
        console.log('Estudiantes:', this.estudiantes);
      },
      (error) => {
        console.error('Error al cargar estudiantes:', error);
      }
    );
  }

  loadBooks() {
    this._booksService.loadBooksAvailable().subscribe(
      (libros: any[]) => {
        this.libros = libros.map((libro) => ({
          value: libro.idlibros,
          text: libro.idlibros,
        }));
        console.log('Libros:', this.libros);
      },
      (error) => {
        console.error('Error al cargar libros:', error);
      }
    );
  }

  saveData() {
    if (this.emp_form.valid) {
      const action = this.data ? 'actualizado' : 'ingresado';
      if (this.data) {
        this.loanService
          .updateLoan(this.data.idSeccion, this.emp_form.value)
          .subscribe(
            (res) => {
              console.log(res);
              this.showMessage(`Registro ${action} correctamente`);
              this.reference.close();
            },
            (err) => {
              this.showMessage(`Error al ${action} el registro`);
            }
          );
      } else {
        this.loanService.addLoan(this.emp_form.value).subscribe(
          (res) => {
            console.log(res);
            this.showMessage(`Registro ${action} correctamente`);
            this.reference.close();
          },
          (err) => {
            this.showMessage(`La sección ya se encuentra registrada`);
          }
        );
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
