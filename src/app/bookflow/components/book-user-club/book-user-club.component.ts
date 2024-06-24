import {Component, OnInit} from '@angular/core';
import {ReadingClub} from "../../model/reading-club.model";
import {BookflowService} from "../../services/bookflow-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Book} from "../../model/book.model";
import {User} from "../../model/user.model";
@Component({
  selector: 'app-book-user-club',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf
  ],
  templateUrl: './book-user-club.component.html',
  styleUrl: './book-user-club.component.css'
})
export class BookUserClubComponent implements OnInit{

  clubs: ReadingClub[] = [];
  books: Book[] = [];
  users: User[] = [];
  constructor(private bookService: BookflowService, private router: Router){
  }

  ngOnInit() {
    this.getClubs()
    this.getAllBooks();
    this.getUsers();
  }
  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.books = data.map((book: any) => {
            return new Book(
              book.bookIsbn,
              book.bookTitle,
              book.bookGenre,
              book.bookImage,
              book.bookDescription,
              book.bookAuthor,
              book.bookAuthorImage,
              book.bookPublisher,
              book.amazonBookUrl
            );
          });
          console.log(this.books); // Agregar esta línea para imprimir los libros en la consola
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
  getClubs() {
    const userId = 2;
    this.bookService.getClubByUserId(userId).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.clubs = data.map((club: any) => {
            return new ReadingClub(
              club.id,
              club.name,
              club.meetingDate,
              club.bookIsbn,
              club.description,
              club.users
            );
          });
          console.log(this.clubs); // Agregar esta línea para imprimir los clubes en la consola
        } else {
          console.error('No clubs data found in the response.');
        }
      },
      (error) => {
        console.error('Error while fetching clubs:', error);
      }
    );
  }
  getUsers() {
    this.bookService.getUser().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.users = data.map((user: any) => {
            return new User(
              user.id,
              user.username,
              user.role
            );
          });
        }
      }
    );
  }
  getBookImage(bookIsbn: Book) {
    return this.books.filter(book => book.id === bookIsbn)[0].img;
  }
  goBack() {
    return this.router.navigate(['home/profile']);
  }
}
