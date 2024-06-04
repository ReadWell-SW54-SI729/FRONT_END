import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {ActivatedRoute} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf,
    MatCardContent,
    MatButton,
    FormsModule,
    NgIf
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  showFontSizeSelector: boolean = false; // Indica si mostrar el selector de tamaño de letra
  selectedFontSize: string = '16px'; // Almacena el tamaño de letra seleccionado por el usuario
  bookData: Book;
  fontSize: string = '16px'; // Propiedad para almacenar el tamaño de la letra
  userData: User;
  isBookmarked: boolean = false;
  constructor(private bookService: BookflowService, private route: ActivatedRoute, private router: Router) {
    this.bookData = {} as Book;
    this.userData = {} as User;
  }

  ngOnInit() {
    this.getUser();
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('id');
      if (isbn) {
        this.getBooksByIsbn(isbn);
      } else {
        console.error('ISBN not found in route parameters.');
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
          console.log('Book details:', this.bookData);
        } else {
          console.error('No book data found for ISBN:', isbn);
        }
      },
      (error) => {
        console.error('Error retrieving book details:', error);
      }
    );
  }
  getUser() {
    this.bookService.getUser().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.userData = new User(
            data[0].id,
            data[0].firstName,
            data[0].lastName,
            data[0].age,
            data[0].email,
            data[0].description
          );
        }
      });
  }

  addMark(bookId: any, userId: any) {
    this.bookService.addMark(bookId, userId).subscribe({
      next: (response) => {
        console.log('Add bookmark response:', response);
      },
      error: (error) => {
        console.error('Error adding bookmark:', error);
      }
    });
  }
  deleteMark(bookId: any, userId: any) {
    this.bookService.deleteMark(bookId, userId).subscribe({
      next: (response) => {
        console.log('Delete bookmark response:', response);
      },
      error: (error) => {
        console.error('Error deleting bookmark:', error);
      }
    });
  }
  toggleBookmark(bookId: any, userId: any) {
    this.isBookmarked = !this.isBookmarked;
    // Llama al método correspondiente para agregar o eliminar el marcador
    if (this.isBookmarked) {
      this.addMark(bookId, userId);
    } else {
      this.deleteMark(bookId, userId);
    }
  }
  readNow() {
    alert('Para acceder a este contenido, debe pagar una de nuestras suscripciones.');
  }

  adjustFontSize() {
    this.showFontSizeSelector = !this.showFontSizeSelector; // Alternar la visibilidad del selector de tamaño de letra
  }

  applyFontSize() {
    this.fontSize = this.selectedFontSize; // Aplicar el tamaño de letra seleccionado
    this.showFontSizeSelector = false; // Ocultar el selector de tamaño de letra
  }

  agregarComentario() {
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('id');
      if (isbn) {
        this.router.navigateByUrl(`Catalogue/bookDetail/${isbn}/Comment`).then(r => console.log('Navigated to comment page'));
      } else {
        console.error('ISBN not found in route parameters.');
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
