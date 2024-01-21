import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeccionService } from '../../services/sections.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'agb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  emp_form: FormGroup;
  title = '';
  isEdit: boolean;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    private sectionService: SeccionService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data ? 'EDITAR SECCION' : 'NUEVA SECCION';
    this.isEdit = data ? true : false;
    this.emp_form = this.formBuilder.group({
      nombreSec: '',
    });
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.emp_form = new FormGroup({
      idSeccion: new FormControl(this.data?.idSeccion),
      nombreSec: new FormControl(
        this.data?.nombreSec,
        Validators.pattern('^[a-zA-Z ]*$') && Validators.required
      ),
    });
  }

  saveData() {
    if (this.emp_form.valid) {
      if (this.data) {
        this.sectionService
          .updateSeccion(this.data.idSeccion, this.emp_form.value)
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
        this.sectionService.addSeccion(this.emp_form.value).subscribe(
          (res) => {
            console.log(res);
            this.showMessage('Registro ingresado correctamente');
            this.reference.close();
          },
          (err) => {
            this.showMessage('La seccion ya se encuentra registrado');
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
