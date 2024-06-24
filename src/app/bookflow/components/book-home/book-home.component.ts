import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../book-card/book-card.component";
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-book-home',
  standalone: true,
  imports: [
    BookCardComponent,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf
  ],
  templateUrl: './book-home.component.html',
  styleUrl: './book-home.component.css'
})
export class BookHomeComponent implements OnInit {

  libros: Book[] = []; // Arreglo para almacenar los libros

  constructor(private bookService: BookflowService, private router: Router) {}

  ngOnInit() {
    this.getBooks(); // Llama al método para obtener los libros al inicializar el componente
  }

  getBooks() {
    // Llama al servicio para obtener los libros
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          // Transforma los datos del servicio en objetos Book y guarda solo los primeros tres libros
          this.libros = data.slice(0, 3).map((book: any) => {
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
          console.log(this.libros); // Agregar esta línea para imprimir los libros en la consola
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

  goCatalogue() {
    console.log('Book details:');
    this.router.navigateByUrl(`home/Catalogue`);
  }
  getDetails(book: any) {
    console.log('Book details:', book.id);
    this.router.navigateByUrl(`Catalogue/bookDetail/${book.id}`);
  }
}
