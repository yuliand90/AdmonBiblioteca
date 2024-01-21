import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksService } from 'src/app/books/services/books.service';

type CardContent = {
  title: string;
  description: string;
  imgUrl: string;
  estado: string;
  genero: string;
};

@Component({
  selector: 'agb-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  cedula: string = '';
  cards = signal<CardContent[]>([]);
  tituloLibros: string = '';

  images = [
    ' ../../../../../../assets/portadas/libro1.jpg',
    ' ../../../../../../assets/portadas/libro2.jpg',
    ' ../../../../../../assets/portadas/libro3.jpg',
    ' ../../../../../../assets/portadas/libro4.jpg',
    ' ../../../../../../assets/portadas/libro5.jpg',
    ' ../../../../../../assets/portadas/libro6.jpg',
    ' ../../../../../../assets/portadas/libro7.jpg',
    ' ../../../../../../assets/portadas/libro8.jpg',
    ' ../../../../../../assets/portadas/libro9.jpg',
  ];

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('userrole') == 'Administrador') {
      this.tituloLibros = 'Libros disponibles';
      this.booksService.loadBooks().subscribe((books) => {
        const cards: CardContent[] = books.map((book, index) => {
          const card: CardContent = {
            title: book.titulo,
            description: book.descripcion,
            imgUrl: this.images[index],
            estado: book.disponibilidad,
            genero: book.genero_per,
          };

          return card;
        });

        this.cards.set(cards);
      });
    } else if (sessionStorage.getItem('userrole') === 'Estudiante') {
      this.cedula = sessionStorage.getItem('cedula') || ' ';
      this.tituloLibros = 'Libros adquiridos';
      this.booksService.loadBooksByUser(this.cedula).subscribe((books) => {
        const cards: CardContent[] = books.map((book, index) => {
          const card: CardContent = {
            title: book.titulo,
            description: book.descripcion,
            imgUrl: this.images[index],
            estado: book.disponibilidad,
            genero: book.genero_per,
          };
          return card;
        });

        this.cards.set(cards);
      });
    }
  }
}
