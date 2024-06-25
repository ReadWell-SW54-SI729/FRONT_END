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
  genres: { id:any,name: any, count: number }[] = [
    { id:1,name: 'Legal Thriller', count: 0 },
    { id:2,name: 'Historical Fiction', count: 0 },
    { id:3,name: 'Fantasy', count: 0 },
    { id:4,name: 'Mystery', count: 0 },
    { id:5,name: 'Romance', count: 0 },
    { id:6,name: 'Fiction', count: 0 },
    { id:7,name: 'Nonfiction', count: 0 },
    { id:8,name: 'Biography', count: 0 },
    { id:9,name: 'History', count: 0 },
    { id:10,name: 'Psychology', count: 0 },
    { id:11,name: 'Health', count: 0 },
    { id:12,name: 'True Crime', count: 0 },
  ];
  selectedGenres: string[] = [];

  constructor(private bookService: BookflowService, private router: Router) {
    this.bookData = {} as Book;
  }

  ngOnInit() {
    this.getGenres();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.books = data.map((book: any) => {
            return new Book(
              book.bookId,
              book.bookTitle,
              book.bookGenreId,
              book.bookImage,
              book.bookDescription,
              book.bookAuthor,
              book.bookAuthorImage,
              book.bookPublisher,
              book.bookRank
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

  getGenres() {
    this.bookService.getGenres().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.genres = data.map((genre: any) => {
            return {
              id: genre.genreId,
              name: genre.Name,
              count: 0
            };
          });
          this.getBooks(); // Llamar a getBooks después de cargar los géneros
        } else {
          console.error('No genre data found in the response.');
        }
      },
      (error) => {
        console.error('Error retrieving genres:', error);
      }
    );
  }

  updateGenreCounts() {
    this.genres.forEach(genre => {
      genre.count = this.books.filter(book => book.id === genre.id).length;
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
                book.bookId,
                book.bookTitle,
                book.bookGenreId,
                book.bookImage,
                book.bookDescription,
                book.bookAuthor,
                book.bookAuthorImage,
                book.bookPublisher,
                book.bookRank
              );
            });
            this.updateGenreCounts();
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
              book.bookId,
              book.bookTitle,
              book.bookGenreId,
              book.bookImage,
              book.bookDescription,
              book.bookAuthor,
              book.bookAuthorImage,
              book.bookPublisher,
              book.bookRank
            );
          });
          this.updateGenreCounts();
          console.log('Books by name:', this.books);
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
      this.getBooksByName(filteredValue);
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

  goSuscription() {
    this.router.navigateByUrl(`home/subscription`);
  }
}
