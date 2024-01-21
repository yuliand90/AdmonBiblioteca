import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorsService } from 'src/app/authors/services/authors.service';

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
  nacionalidad: string[] = [
    'Ecuatoriano',
    'Colombiano',
    'Peruano',
    'Venezolano',
    'Chileno',
    'Argentino',
    'Brasileño',
    'Boliviano',
    'Uruguayo',
    'Paraguayo',
    'Mexicano',
    'Español',
    'Portugues',
    'Italiano',
    'Frances',
    'Aleman',
    'Ingles',
    'Ruso',
    'Chino',
    'Japones',
    'Coreano',
    'Australiano',
    'Neozelandes',
    'Sudafricano',
    'Indio',
    'Pakistaní',
    'Turco',
    'Iraní',
    'Arabe',
  ];

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private authorsService: AuthorsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR AUTOR' : 'NUEVO AUTOR';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      cedula: '',
      nombre: '',
      apellido: '',
      fecha_Nac: '',
      fecha_Falle: '',
      nacionalidad: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.emp_form = new FormGroup({
      cedula: new FormControl(
        this.data?.cedula,
        Validators.pattern('^[0-9]*$') && Validators.pattern('^[0-9]{10}$')
      ),
      nombre: new FormControl(
        this.data?.nombre,
        Validators.pattern('^[a-zA-Z ]*$') && Validators.required
      ),
      apellido: new FormControl(
        this.data?.apellido,
        Validators.pattern('^[a-zA-Z ]*$') && Validators.required
      ),

      fecha_Nac: new FormControl(this.data?.fecha_Nac, Validators.required),
      fecha_Falle: new FormControl(this.data?.fecha_Falle),
      nacionalidad: new FormControl(
        this.data?.nacionalidad,
        Validators.required
      ),
    });
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.data) {
        this.authorsService
          .updateAuthor(this.data.cedula, this.emp_form.value)
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
        console.log(this.emp_form.value);
      } else {
        this.authorsService.addAuthor(this.emp_form.value).subscribe(
          (res) => {
            console.log(res);
            this.showMessage('Registro ingresado correctamente');
            this.reference.close();
            console.log(this.emp_form.value);
          },
          (err) => {
            this.showMessage('El usuario ya se encuentra registrado');
          }
        );
        console.log(this.emp_form.value);
      }
    }
  }

  showMessage(message: string, duration: number = 5000, action: string = 'Ok') {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top' });
  }
}
