import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Book} from "../../../model/book.model";
import {BookflowService} from "../../../services/bookflow-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf,
    MatCardContent
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  bookData: Book;
  books: Book[] = [];
  constructor(private bookService: BookflowService, private route: ActivatedRoute){
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
  getBooksByIsbn(isbn:string){
    this.bookService.getBooksByIsbn(isbn).subscribe(
      (data: any) => {
        if (data) {
          this.bookData = new Book(
            data.bookIsbn,
            data.bookTitle,
            data.bookImage,
            data.bookDescription,
            data.bookAuthor,
            data.bookPublisher,
            data.amazonBookUrl
          );
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
}
