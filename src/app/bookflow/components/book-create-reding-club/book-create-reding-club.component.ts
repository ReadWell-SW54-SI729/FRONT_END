import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import { BookflowService } from '../../services/bookflow-service.service';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-create-reding-club',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatLabel,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './book-create-reding-club.component.html',
  styleUrl: './book-create-reding-club.component.css'
})
export class BookCreateRedingClubComponent implements OnInit{

  clubName: string = '';
  description: string = '';
  meetingDate: string = '';
  chosenBook: string = '';
  books: Book[] = [];

  constructor(private bookService: BookflowService, private router: Router) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
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
          console.log('Books loaded:', this.books);
        } else {
          console.error('No books data found.');
        }
      },
      (error) => {
        console.error('Error retrieving books:', error);
      }
    );
  }

  createClub() {
    if (!this.chosenBook) {
      alert('Por favor selecciona un libro.');
      return;
    }

    if (this.clubName && this.description && this.meetingDate) {
      this.bookService.createClub(this.clubName, this.description, this.meetingDate, this.chosenBook).subscribe(
        (data: any) => {
          console.log('Club created successfully:', data);
          alert('Club creado exitosamente');
          this.resetForm();
        },
        (error) => {
          console.error('Error while creating club:', error);
          alert('Error al crear el club');
        }
      );
    } else {
      alert('Por favor completa todos los campos antes de crear el club.');
    }
  }

  getSelectedBookImage(): string {
    const selectedBook = this.books.find(b => b.id === this.chosenBook);
    return selectedBook ? selectedBook.img : '';
  }

  resetForm() {
    this.clubName = '';
    this.description = '';
    this.meetingDate = '';
    this.chosenBook = '';
  }

  goBack() {
    this.router.navigate(['Catalogue/reading-club']);
  }
}
