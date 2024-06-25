import {Component, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {BookflowService} from "../../../services/bookflow-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-recommend-friends',
  standalone: true,
  imports: [
    MatButton
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
  getBooksByIsbn(isbn: any) {
    this.bookService.getBooksByIsbn(isbn).subscribe(
      (data: any) => {
        if (data) {
          console.log('Book data:', data);
          this.bookData = new Book(
            data[isbn-1].bookIsbn,
            data[isbn-1].bookTitle,
            data[isbn-1].bookGenre,
            data[isbn-1].bookImage,
            data[isbn-1].bookDescription,
            data[isbn-1].bookAuthor,
            data[isbn-1].bookAuthorImage,
            data[isbn-1].bookPublisher,
            data[isbn-1].amazonBookUrl
          );
          let name = data[isbn-1].bookTitle;
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

    this.mostrarSnackBar('Recomendación exitosa');
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  goBack() {
    window.history.back();
  }
}
