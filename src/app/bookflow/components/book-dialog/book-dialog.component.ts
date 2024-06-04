import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {MatButton} from "@angular/material/button";
import {MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatDialogActions,
    MatDialogTitle,
    MatCardImage,
    MatDialogClose,
    MatButton,
    MatCardTitle,
    NgForOf,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.css'
})
export class BookDialogComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookflowService
  ) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.books = data.map((book: any) => new Book(
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
          // Llena inicialmente los libros filtrados con todos los libros
          this.filteredBooks = this.books.slice();
        } else {
          console.error('No books data found in the response.');
        }
      },
      (error) => {
        console.error('Error retrieving books:', error);
      }
    );
  }

  selectBook(book: Book) {
    // Cuando se selecciona un libro, enviarlo de vuelta al componente padre
    this.dialogRef.close({ bookIsbn: book.id, bookImage: book.img });
  }

  // Método para filtrar libros
  filterBooks(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');
    filteredValue = filteredValue.toUpperCase();
    inputElement.value = filteredValue;

    if (filteredValue === '' || filteredValue === null) {
      this.getAllBooks();
    } else {
      this.getBooksByName(inputElement.value);
    }
  }

  getBooksByName(name: string) {
    this.bookService.getBooksByName(name).subscribe(
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
        } else {
          console.error('No book data found.');
        }
      },
      (error) => {
        console.error('Error retrieving books by name:', error);
      }
    );
  }

}
