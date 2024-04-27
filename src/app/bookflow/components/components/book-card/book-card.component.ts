import {Component, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {BookflowService} from "../../../services/bookflow-service.service";
import {MatCardModule} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    NgForOf,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit{

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
              book.bookImage,
              book.bookDescription,
              book.bookAuthor,
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
  getDetails(book: any) {
    console.log('Book details:', book.id);
    this.router.navigateByUrl(`/bookDetail/${book.id}`);
  }

}
