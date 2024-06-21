import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {BookflowService} from "../../../services/bookflow-service.service";
import {Book} from "../../../model/book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCard, MatCardModule} from "@angular/material/card";
import {NgForOf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-lectura',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    NgForOf,
    NgOptimizedImage,
    SlicePipe,
    MatCardModule,
    MatFormField,
    NgForOf,
    MatButton,
  ],
  templateUrl: './lectura.component.html',
  styleUrl: './lectura.component.css'
})
export class LecturaComponent implements OnInit{

  bookData: Book;
  books: Book[] = [];

  constructor(private bookService: BookflowService, private router: Router ){
    this.bookData = {} as Book;
  }

  ngOnInit() {

    this.getBooks();
  }
  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.books = data.map((book: any) => {
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
            );
          });
          console.log(this.books); // Agregar esta línea para imprimir los libros en la consola
        } else {
          console.error('No books data found in the response.');
        }
      },
      (error) => {
        console.error('Error retrieving books:', error);
        // Manejar el error apropiadamente
      }
    );
  }
  redirectToBookDetails(bookisbn: any) {
    this.router.navigate([`/Catalogue/bookDetail/${bookisbn.id}`]);
  }
}
