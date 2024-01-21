export class Book {
  idlibros: string;
  titulo: string;
  autor_per: string;
  genero_per: string;
  estado_conser: string;
  seccion_per: string;
  disponibilidad: string;
  descripcion: string;

  constructor(
    idlibros: string,
    titulo: string,
    autor_per: string,
    genero_per: string,
    estado_conser: string,
    seccion_per: string,
    disponibilidad: string,
    descripcion: string
  ) {
    (this.idlibros = idlibros),
      (this.titulo = titulo),
      (this.autor_per = autor_per),
      (this.genero_per = genero_per),
      (this.estado_conser = estado_conser),
      (this.seccion_per = seccion_per),
      (this.disponibilidad = disponibilidad),
      (this.descripcion = descripcion);
  }
}
