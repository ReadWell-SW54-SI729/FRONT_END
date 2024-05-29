import {Component, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {BookflowService} from "../../../services/bookflow-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recommend-friends',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf,
    MatCardContent,
    MatButton, MatSnackBarModule,
  ],
  templateUrl: './recommend-friends.component.html',
  styleUrl: './recommend-friends.component.css'
})
export class RecommendFriendsComponent implements OnInit{
  bookData: Book;
  constructor(private bookService: BookflowService, private route: ActivatedRoute,private router: Router, private _snackBar: MatSnackBar){
    this.bookData = {} as Book;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('id');
      if (isbn) {
        this.getBooksByIsbn(isbn);
      } else {
        console.error('Name not found in route parameters.');
      }
    });
  }
  getBooksByIsbn(isbn: string) {
    this.bookService.getBooksByIsbn(isbn).subscribe(
      (data: any) => {
        if (data) {
          console.log('Book data:', data);
          this.bookData = new Book(
            data[0].bookIsbn,
            data[0].bookTitle,
            data[0].bookGenre,
            data[0].bookImage,
            data[0].bookDescription,
            data[0].bookAuthor,
            data[0].bookAuthorImage,
            data[0].bookPublisher,
            data[0].amazonBookUrl
          );
          let name = data[0].bookTitle;
          console.log('Book details:', this.bookData);
        } else {
          console.error('No book data found for ISBN:', isbn);
        }
      },
      (error) => {
        console.error('Error retrieving book details:', error);
        // Manejar el error apropiadamente
      }
    );
  }
  enviarMensaje() {
    // Aquí enviarías el mensaje
    // Después de enviar el mensaje, muestras la Snackbar
    this.mostrarSnackBar('Recomendación exitosa');
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
