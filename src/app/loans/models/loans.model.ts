export class Loan {
  idPrestamo: string;
  id_libro: string;
  id_usuario: string;
  fecha_in_pres: Date;
  fecha_dev_lib: Date;
  accion: string;
  constructor(
    idPrestamo: string,
    id_libro: string,
    id_usuario: string,
    fecha_in_pres: Date,
    fecha_dev_lib: Date,
    accion: string
  ) {
    this.idPrestamo = idPrestamo;
    this.id_libro = id_libro;
    this.id_usuario = id_usuario;
    this.fecha_in_pres = fecha_in_pres;
    this.fecha_dev_lib = fecha_dev_lib;
    this.accion = accion;
  }
}
export default Loan;
