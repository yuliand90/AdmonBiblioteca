import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdministrationService } from 'src/app/administration/services/administration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'agb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  togglePassword = true;
  constructor(
    private builder: FormBuilder,
    private adminService: AdministrationService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  userdata: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginForm.valid) {
      this.adminService
        .loadAdmin(this.loginForm.value.username || '')
        .subscribe((res) => {
          this.userdata = res;
          console.log(this.userdata);
          if (this.userdata.password === this.loginForm.value.password) {
            sessionStorage.setItem('username', this.userdata.username);
            sessionStorage.setItem('userrole', this.userdata.rol);
            sessionStorage.setItem('cedula', this.userdata.cedula);
            this.router.navigate(['/inicio']);
          } else {
            alert('Invalid Password');
          }
        });
    }
  }
}
