import {Component,  OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    NgForOf,
    MatButton,
    MatInput,
    MatSelect,
    MatOption,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit{
  bookData: Book;
  books: Book[] = [];
  genres: { name: string, count: number }[] = [
    { name: 'Legal Thriller', count: 0 },
    { name: 'Historical Fiction', count: 0 },
    { name: 'Fantasy', count: 0 },
    { name: 'Mystery', count: 0 },
    { name: 'Romance', count: 0 },
    { name: 'Fiction', count: 0 },
    { name: 'Nonfiction', count: 0 },
    { name: 'Biography', count: 0 },
    { name: 'History', count: 0 },
    { name: 'Psychology', count: 0 },
    { name: 'Health', count: 0 },
    { name: 'True Crime', count: 0 },
  ];
  selectedGenres: string[] = [];

  constructor(private bookService: BookflowService, private router: Router) {
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
          this.updateGenreCounts();
        } else {
          console.error('No books data found in the response.');
        }
      },
      (error) => {
        console.error('Error retrieving books:', error);
      }
    );
  }

  updateGenreCounts() {
    this.genres.forEach(genre => {
      genre.count = this.books.filter(book => book.genre === genre.name).length;
    });
  }

  getDetails(book: any) {
    console.log('Book details:', book.id);
    this.router.navigateByUrl(`Catalogue/bookDetail/${book.id}`);
  }

  filterBooks() {
    if (this.selectedGenres.length === 0) {
      this.getBooks();
    } else {
      this.bookService.getBooksByGenre(this.selectedGenres).subscribe(
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
        }
      );
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

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');
    filteredValue = filteredValue.toUpperCase();
    inputElement.value = filteredValue;

    if (filteredValue === '' || filteredValue === null) {
      this.getBooks();
    } else {
      this.getBooksByName(inputElement.value);
    }
  }

  goAuthors() {
    this.router.navigateByUrl(`Catalogue/bookListAuthors`);
  }

  goLectures() {
    this.router.navigateByUrl(`Catalogue/bookListLectures`);
  }

  goReadingClub() {
    this.router.navigateByUrl(`Catalogue/reading-club`);
  }
}
