import {Component,  OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    NgForOf,
    MatButton,
    MatInput,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit{

   bookData: Book;
   books: Book[] = [];
    genres: string[] = [
      'Todos', 'Legal Thriller', 'Historical Fiction', 'Fantasy', 'Mystery','Romance','Fiction','Nonfiction','Biography','History','Psychology','Health',
      'True Crime'
    ];
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
  getDetails(book: any) {
    console.log('Book details:', book.id);
    this.router.navigateByUrl(`Catalogue/bookDetail/${book.id}`);
  }
  getBooksByGenre(genre: string) {
    this.bookService.getBooksByGenre(genre).subscribe(
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
        console.error('Error retrieving books:', error);
        // Manejar el error apropiadamente
      }
    );
  }
  filterBooks(genre: string) {
    if (genre === 'Todos') {
      this.getBooks();
    } else {
      console.log('Filtering books by genre:');
      this.getBooksByGenre(genre);
    }
  }
  getBooksByName(name: string){
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
        // Manejar el error apropiadamente
      }
    );
  }
  ApplyFilter(event:Event){
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');
    filteredValue = filteredValue.toUpperCase(); // Convertir a mayúsculas
    inputElement.value = filteredValue;

    console.log('working');
    if (filteredValue === '' || filteredValue === null) {
      this.getBooks();
    }
    else {
    this.getBooksByName(inputElement.value);
    }

  }
  goAuthors() {
    console.log('Book details:');
    this.router.navigateByUrl(`Catalogue/bookListAuthors`);
  }

  goLectures() {
    console.log('Book details:');
    this.router.navigateByUrl(`Catalogue/bookListLectures`);
  }

}
