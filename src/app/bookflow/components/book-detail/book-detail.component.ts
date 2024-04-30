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
export class BookDetailComponent implements OnInit{
  bookData: Book;
  constructor(private bookService: BookflowService, private route: ActivatedRoute,private router: Router){
    this.bookData = {} as Book;
  }
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const isbn = params.get('id');
    if (isbn) {
      this.getBooksByName(isbn);
    } else {
      console.error('Name not found in route parameters.');
    }
  });
}
  getBooksByName(isbn: string) {
    this.bookService.getBooksByName(isbn).subscribe(
      (data: any) => {
        if (data) {
          console.log('Book data:', data);
          this.bookData = new Book(
            data[0].bookIsbn,
            data[0].bookTitle,
            data[0].bookImage,
            data[0].bookDescription,
            data[0].bookAuthor,
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
  agregarComentario(){
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('id');
      if (isbn) {
        this.router.navigateByUrl(`Catalogue/bookDetail/${isbn}/Comment`);
      } else {
        console.error('Name not found in route parameters.');
      }
    });
  }
}
