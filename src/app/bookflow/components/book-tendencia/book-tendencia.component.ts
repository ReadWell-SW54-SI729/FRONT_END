import { Component, OnInit } from '@angular/core';

import {NgForOf} from "@angular/common";
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-book-tendencia',
  standalone: true,
  imports: [
    MatButton,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle
  ],
  templateUrl: './book-tendencia.component.html',
  styleUrl: './book-tendencia.component.css'
})

export class BookTendenciaComponent implements OnInit {

  libros: Book[] = []; // Arreglo para almacenar los libros

  constructor(private bookService: BookflowService, private router: Router) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const filteredBooks = data.filter(book => this.isDesiredBook(book));
          this.libros = filteredBooks.map((book: any) =>{
            return new Book(
              book.bookIsbn,
              book.bookTitle,
              book.bookGenre,
              book.bookImage,
              book.bookDescription,
              book.bookAuthor,
              book.bookAuthorImage,
              book.bookPublisher,
              book.amazonBookUrl
          )});
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
      "Sarah J. Maas",
      'Jasmine Warga',
      'Jennette McCurdy',
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
