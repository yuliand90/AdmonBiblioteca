export class Author {
  cedula: string;
  nombre: string;
  apellido: string;
  fecha_Nac: Date;
  fecha_Falle: Date;
  nacionalidad: string;

  constructor(
    cedula: string,
    nombre: string,
    apellido: string,
    fecha_Nac: Date,
    fecha_Falle: Date,
    nacionalidad: string
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_Nac = fecha_Nac;
    this.fecha_Falle = fecha_Falle;
    this.nacionalidad = nacionalidad;
  }
}
