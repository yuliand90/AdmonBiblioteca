import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministrationService } from '../../services/administration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'agb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  emp_form: FormGroup;
  title = '';
  roles: string[] = ['Administrador', 'Estudiante'];
  togglePassword = true;
  isEdit: boolean;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR USUARIO' : 'NUEVO USUARIO';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      cedula: '',
      nombre: '',
      apellido: '',
      direccion: '',
      celular: '',
      username: '',
      password: '',
      rol: '',
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
      direccion: new FormControl(
        this.data?.direccion,
        Validators.pattern('^[a-zA-Z ]*$') && Validators.required
      ),
      celular: new FormControl(
        this.data?.celular,
        Validators.pattern('^[0-9]*$') && Validators.pattern('^[0-9]{10}$')
      ),
      username: new FormControl(this.data?.username, Validators.required),
      password: new FormControl(this.data?.password, Validators.required),
      rol: new FormControl(this.data?.rol, Validators.required),
    });
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.data) {
        this.administrationService
          .updateAdministrador(this.data.cedula, this.emp_form.value)
          .subscribe(
            (res) => {
              console.log(res);
              this.showMessage('Registro actualizado correctamente');
              this.reference.close();
            },
            (err) => {
              this.showMessage('Error al actualizar el registro');
            }
          );
        console.log(this.emp_form.value);
      } else {
        this.administrationService.addAdmin(this.emp_form.value).subscribe(
          (res) => {
            console.log(res);
            this.showMessage('Registro ingresado correctamente');
            this.reference.close();
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
