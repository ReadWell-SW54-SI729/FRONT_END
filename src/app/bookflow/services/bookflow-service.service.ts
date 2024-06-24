import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, switchMap, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  BookflowService {
  baseUrl: string = "http://localhost:3000/api/v1"; // muetsra todos los libros
  constructor(private Http:HttpClient) { }
  lastId = 9;

  getBooks(){
    return this.Http.get<any>(`http://localhost:8080/api/v1/books`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByIsbn(isbn:string){

    return this.Http.get<any>(`${this.baseUrl}/books?bookIsbn=${isbn}`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByGenre(genre: string[]){

      return this.Http.get<any>(`${this.baseUrl}/books?bookGenre=${genre}`).pipe(
        tap((response) => console.log('API Response:', response))
      );
  }

  getBooksByName(name:string){
    return this.Http.get<any>(`${this.baseUrl}/books?bookTitle=${name}`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getClubs(){
    return this.Http.get<any>(`${this.baseUrl}/reading-clubs`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getUser(){
    return this.Http.get<any>(`${this.baseUrl}/users`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
  getClubByUserId(userId: any) {
    return this.Http.get<any>(`${this.baseUrl}/reading-clubs?users=1`).pipe(
      tap((response) => console.log('API Response of ClubByUserId:', response))
    );

  }

  addUserToClub(clubId: string, userId: string) {

    return this.Http.patch<any>(`${this.baseUrl}/reading-clubs/${clubId}`, { users: [userId] }).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
  createClub(clubName: string, description: string, meetingDate: string, chosenBook: string) {
    const clubData = {
      id: (++this.lastId).toString(),
      name: clubName,
      meetingDate: meetingDate,
      description: description,
      bookIsbn: chosenBook
    };
    return this.Http.post<any>(`${this.baseUrl}/reading-clubs`, clubData).pipe(
      tap((response) => console.log('Club created:', response))
    );
  }
// Métodos para leer libros, ajustar configuración y manejar marcadores/notas


  addMark(isbn: string, userId: string) {
    return this.Http.patch<any>(`${this.baseUrl}/users/${userId}`, {bookFavorites:[isbn]}).pipe(
      tap((response) => console.log('Add bookmark response:', response))
    );
  }
  //Métodos delete

  deleteMark(isbn: string, userId: string) {
    // Realizamos una solicitud GET para obtener los datos del usuario
    return this.Http.get<any>(`${this.baseUrl}/users/${userId}`).pipe(
      switchMap(userData => {
        // Verificamos si los datos del usuario y la lista bookFavorites existen
        if (userData && userData.bookFavorites) {
          // Filtramos la lista bookFavorites para eliminar el ISBN específico
          const updatedBookFavorites = userData.bookFavorites.filter((item: string) => item !== isbn);
          // Realizamos una solicitud PATCH para actualizar la lista bookFavorites del usuario
          return this.Http.patch<any>(`${this.baseUrl}/users/${userId}`, { bookFavorites: updatedBookFavorites }).pipe(
            tap((response) => console.log('Delete bookmark response:', response))
          );
        } else {
          // Si el usuario o la lista bookFavorites no existen, devolvemos un Observable vacío
          console.error('User data or bookFavorites not found.');
          return EMPTY;
        }
      }),
      catchError(error => {
        console.error('Error deleting bookmark:', error);
        return throwError(error);
      })
    );
  }

}
