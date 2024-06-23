import { Component, OnInit } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardModule} from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import {BookflowService} from "../../../services/bookflow-service.service";
import {Book} from "../../../model/book.model";
import {Router} from "@angular/router";
import {NgForOf, SlicePipe} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import { MatDialog } from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [MatCardActions, MatCardContent, MatCard, MatCardImage, MatButton, NgForOf, MatDialogModule, SlicePipe, MatCardModule,
    MatFormField,
    NgForOf,
    MatButton, MatSnackBarModule],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css'
})
export class AutorComponent implements OnInit {
  bookData: Book;
  books: Book[] = [];

  constructor(private bookService: BookflowService, private router: Router, private _snackBar: MatSnackBar){
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
          this.books = this.getUniqueAuthors(this.books);
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

  enviarMensaje() {
    // Aquí enviarías el mensaje
    // Después de enviar el mensaje, muestras la Snackbar
    this.mostrarSnackBar('Siguiendo autor');
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  getUniqueAuthors(books: any[]): any[] {
    const seen = new Set();
    return books.filter(book => {
      const duplicate = seen.has(book.author);
      seen.add(book.author);
      return !duplicate;
    });
  }

}
