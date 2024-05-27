import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Book} from "../../model/book.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {ActivatedRoute} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

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
    MatButton
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  bookData: Book;
  fontSize: string = '16px'; // Propiedad para almacenar el tamaño de la letra

  constructor(private bookService: BookflowService, private route: ActivatedRoute, private router: Router) {
    this.bookData = {} as Book;
  }

  ngOnInit() {
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

  readNow() {
    const isbn = this.bookData.id;
    if (isbn) {
      this.bookService.readBook(isbn).subscribe(
        (data: any) => {
          console.log('Opening reader with book:', data);
          // Implementar lógica para abrir el lector de libros
        },
        (error) => {
          console.error('Error opening book reader:', error);
        }
      );
    } else {
      console.error('No ISBN available for the book.');
    }
  }

  adjustSettings() {
    const isbn = this.bookData.id;
    const settings = { fontSize: this.fontSize, fontStyle: 'Arial' }; // Ajustes incluyendo el tamaño de la letra
    if (isbn) {
      this.bookService.adjustReadingSettings(isbn, settings).subscribe(
        (data: any) => {
          console.log('Reading settings adjusted:', data);
          // Implementar lógica para aplicar los ajustes en el lector
        },
        (error) => {
          console.error('Error adjusting reading settings:', error);
        }
      );
    } else {
      console.error('No ISBN available for the book.');
    }
  }

  addBookmark() {
    const isbn = this.bookData.id;
    const bookmark = { page: 42, note: 'Important section' };
    if (isbn) {
      this.bookService.addBookmark(isbn, bookmark).subscribe(
        (data: any) => {
          console.log('Bookmark added:', data);
          // Implementar lógica para manejar los marcadores
        },
        (error) => {
          console.error('Error adding bookmark:', error);
        }
      );
    } else {
      console.error('No ISBN available for the book.');
    }
  }

  addNote() {
    const isbn = this.bookData.id;
    const note = { page: 42, content: 'This part explains the main plot twist.' };
    if (isbn) {
      this.bookService.addNote(isbn, note).subscribe(
        (data: any) => {
          console.log('Note added:', data);
          // Implementar lógica para manejar las notas
        },
        (error) => {
          console.error('Error adding note:', error);
        }
      );
    } else {
      console.error('No ISBN available for the book.');
    }
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
  goBack(){
    window.history.back();
  }
}
