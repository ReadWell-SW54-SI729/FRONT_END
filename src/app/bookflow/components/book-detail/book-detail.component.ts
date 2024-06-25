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
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

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
    NgIf,
    MatFormField,
    MatInput
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  showFontSizeSelector: boolean = false;
  selectedFontSize: string = '16px';
  bookData: Book = {} as Book;
  fontSize: string = '16px';
  userData: User = {} as User;
  isBookmarked: boolean = false;
  showCommentForm: boolean = false;
  nuevoComentario: string = '';
  comentarios: string[] = [];

  constructor(private bookService: BookflowService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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

  getBooksByIsbn(isbn: any): void {
    this.bookService.getBooksByIsbn(isbn).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          const book = data[isbn-1]; // Assuming data is an array of books
          this.bookData = new Book(
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
        } else {
          console.error('No book data found for ISBN:', isbn);
        }
      },
      (error) => {
        console.error('Error retrieving book details:', error);
      }
    );
  }

  getUser(): void {
    this.bookService.getUser().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.userData = new User(
            data[1].id,
            data[1].username,
            data[1].role
          );
        }
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
    );
  }

  toggleBookmark(bookId: any, userId: any): void {
    this.isBookmarked = !this.isBookmarked;
    if (this.isBookmarked) {
      this.addBookmark(bookId, userId);
    } else {
      this.removeBookmark(bookId, userId);
    }
  }

  addBookmark(bookId: any, userId: any): void {
    this.bookService.addMark(bookId, userId).subscribe(
      () => console.log('Bookmark added successfully.'),
      (error) => console.error('Error adding bookmark:', error)
    );
  }

  removeBookmark(bookId: any, userId: any): void {
    this.bookService.deleteMark(bookId, userId).subscribe(
      () => console.log('Bookmark removed successfully.'),
      (error) => console.error('Error removing bookmark:', error)
    );
  }

  readNow(): void {
    alert('Para acceder a este contenido, debe pagar una de nuestras suscripciones.');
  }

  recommend(): void {
    this.router.navigateByUrl(`Catalogue/bookDetail/${this.bookData.id}/Recommend`);
  }

  goBack(): void {
    window.history.back();
  }

  adjustFontSize(): void {
    this.showFontSizeSelector = !this.showFontSizeSelector;
  }

  applyFontSize(): void {
    this.fontSize = this.selectedFontSize;
    this.showFontSizeSelector = false;
  }

  toggleCommentForm(): void {
    this.showCommentForm = !this.showCommentForm;
  }

  publicarComentario(): void {
    if (this.nuevoComentario.trim() !== '') {
      this.comentarios.push(this.nuevoComentario);
      this.nuevoComentario = '';
    }
    this.showCommentForm = false;
  }
}
