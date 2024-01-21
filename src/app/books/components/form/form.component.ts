import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/books/services/books.service';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { SeccionService } from 'src/app/sections/services/sections.service';

@Component({
  selector: 'agb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  emp_form: FormGroup;
  title = '';
  togglePassword = true;
  isEdit: boolean;
  generos: string[] = [
    'Aventura',
    'Ciencia Ficción',
    'Drama',
    'Fantasía',
    'Infantil',
    'Romance',
    'Terror',
  ];
  autores: any[] = [];
  secciones: any[] = [];
  disponibilidad: string[] = ['Disponible', 'No disponible'];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private booksService: BooksService,
    private authorsService: AuthorsService, // Cambiado a authorsService
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private seccionService: SeccionService, // Cambiado a seccionService
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR LIBRO' : 'NUEVO LIBRO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      titulo: '',
      autor_per: '',
      genero_per: '',
      estado_conser: '',
      seccion_per: '',
      disponibilidad: '',
      descripcion: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadAutores();
    this.loadSecciones();
  }

  loadForm() {
    this.emp_form = this.formBuilder.group({
      idlibros: new FormControl(this.data?.idlibros),
      titulo: new FormControl(this.data?.titulo, [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      autor_per: new FormControl(this.data?.autor_per, Validators.required),
      genero_per: new FormControl(this.data?.genero_per, [Validators.required]),
      estado_conser: new FormControl(this.data?.estado_conser, [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      seccion_per: new FormControl(this.data?.seccion_per, Validators.required),
      disponibilidad: new FormControl(
        this.data?.disponibilidad,
        Validators.required
      ),
      descripcion: new FormControl(this.data?.descripcion, [
        Validators.required,
      ]),
    });
  }

  loadAutores() {
    this.authorsService.loadAuthors().subscribe(
      (autores: any[]) => {
        this.autores = autores.map((autor) => ({
          value: autor.cedula,
          text: autor.cedula,
        }));
        console.log('Autores:', this.autores);
      },
      (error) => {
        console.error('Error al cargar autores:', error);
      }
    );
  }

  loadSecciones() {
    this.seccionService.loadSeccions().subscribe(
      (secciones: any[]) => {
        this.secciones = secciones.map((seccion) => ({
          value: seccion.idSeccion,
          text: seccion.nombreSec,
        }));
        console.log('Secciones:', this.secciones);
      },
      (error) => {
        console.error('Error al cargar secciones:', error);
      }
    );
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.data) {
        this.booksService
          .updateBook(this.data.idlibros, this.emp_form.value)
          .subscribe(
            (res) => {
              console.log(res);
              this.showMessage('Información actualizada correctamente');
              this.reference.close();
            },
            (err) => {
              this.showMessage('Error al actualizar el registro');
            }
          );
      } else {
        this.booksService.addBook(this.emp_form.value).subscribe(
          (res) => {
            console.log(res);
            this.showMessage('Registro ingresado correctamente');
            this.reference.close();
          },
          (err) => {
            this.showMessage('El libro ya se encuentra registrado');
          }
        );
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
