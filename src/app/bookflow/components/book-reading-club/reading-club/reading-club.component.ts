import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {BookflowService} from "../../../services/bookflow-service.service";
import {Router} from "@angular/router";
import {ReadingClub} from "../../../model/reading-club.model";
import {Book} from "../../../model/book.model";
import {User} from "../../../model/user.model";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-reading-club',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './reading-club.component.html',
  styleUrl: './reading-club.component.css'
})
export class ReadingClubComponent implements OnInit{

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
    this.bookService.getClubs().subscribe(
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
              user.firstName,
              user.lastName,
              user.age,
              user.email,
              user.description,
              user.bookFavorites
            );
          });
        }
      }
    );
  }
  getBookImage(bookIsbn: Book) {
    return this.books.filter(book => book.id === bookIsbn)[0].img;
  }
  goCreateReadingClub() {
    this.router.navigate(['Catalogue/reading-club/create-club']);
  }
  goBack() {
    this.router.navigate(['home/Catalogue']);
  }
  joinClub(clubId: string) {


    // If the user is not in the club, add the user to the club
    this.bookService.addUserToClub(clubId, this.users[0].id).subscribe(
      (data: any) => {
        console.log('Club joined successfully:', data);
        alert('Club joined successfully');
      },
      (error) => {
        console.error('Error while joining club:', error);
        alert('Error while joining club');
      }
    );
  }
}
