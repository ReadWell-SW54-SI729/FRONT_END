import { Component, OnInit } from '@angular/core';

import {NgForOf} from "@angular/common";
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-book-tendencia',
  standalone: true,
  imports: [
    MatButton,
    NgForOf
  ],
  templateUrl: './book-tendencia.component.html',
  styleUrl: './book-tendencia.component.css'
})

export class BookTendenciaComponent implements OnInit {

  libros: Book[] = []; // Arreglo para almacenar los libros

  constructor(private bookService: BookflowService, private router: Router) {}

  ngOnInit() {
    this.getBooks(); // Llama al método para obtener los libros al inicializar el componente
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          // Filtra los libros basados en su bookRank
          const filteredBooks = data.filter(book => this.isDesiredBook(book));
          this.libros = filteredBooks.map((book: any) => new Book(
            book.bookIsbn,
            book.bookTitle,
            book.bookGenre,
            book.bookImage,
            book.bookDescription,
            book.bookAuthor,
            book.bookAuthorImage,
            book.bookPublisher,
            book.amazonBookUrl
          ));
          console.log(this.libros); // Imprime los libros filtrados
        } else {
          console.error('No books data found in the response.');
        }
      },
      (error) => {
        console.error('Error retrieving books:', error);
      }
    );
  }

  isDesiredBook(book: any): boolean {
    // Define el criterio para filtrar libros, por ejemplo, libros de un autor específico o libros más vendidos
    return [
      'Jasmine Warga',
      'Alex Aster',
      'Kathleen Glasgow',
      'Tess Sharpe',
      'Lynn Painter',
      'Tillie Cole',
      'Ali Hazelwood',
      'Tomi Adeyemi',
      'Natasha Preston'
    ].includes(book.bookAuthor);
  }

    goCatalogue() {
    console.log('Book details:');
    this.router.navigateByUrl(`home/Catalogue`);
  }
  getDetails(book: any) {
    console.log('Book details:', book.id);
    this.router.navigateByUrl(`Catalogue/bookDetail/${book.id}`);
  }
}
