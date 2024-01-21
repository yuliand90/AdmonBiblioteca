export class Administration {
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  celular: string;
  email: string;
  password: string;
  rol: string;

  constructor(
    cedula: string,
    nombre: string,
    apellido: string,
    direccion: string,
    celular: string,
    email: string,
    password: string,
    rol: string
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.celular = celular;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}
