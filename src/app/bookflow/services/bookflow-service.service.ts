import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY, Observable, switchMap, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  BookflowService {
  baseUrl: string = "http://localhost:3000/api/v1"; // muetsra todos los libros
  baseUrl2: string = "https://bookflow-app-api.onrender.com/api/v1"; // muestra los libros por isbn
  constructor(private Http:HttpClient) { }

  getBooks(){
    return this.Http.get<any>(`${this.baseUrl2}/books`).pipe(
      tap()
    );
  }

  getBooksByIsbn(isbn:string){
    return this.Http.get<any>(`${this.baseUrl2}/books?bookId=${isbn}`).pipe(
      tap()
    );
  }
  getGenres(){
    return this.Http.get<any>(`${this.baseUrl2}/genres`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
  getGenreByname(name:any){
    return this.Http.get<any>(`${this.baseUrl2}/genres?genreName=${name}`).pipe(tap((response) => console.log('API Response:', response)));
  }
  getBooksByGenre(genre: any){
      return this.Http.get<any>(`${this.baseUrl2}/books/bookGenre?genreName=${genre}`).pipe(
        tap((response) => console.log('API Response:', response))
      );
  }

  getBooksByName(name: string): Observable<any> {
    return this.Http.get<any>(`${this.baseUrl2}/books/bookTitle?bookTitle=${encodeURIComponent(name)}`).pipe(
      tap(response => console.log('API Response:', response))
    );
  }

  getClubs(){
    return this.Http.get<any>(`${this.baseUrl2}/literature_clubs`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getUser(){
    return this.Http.get<any>(`${this.baseUrl2}/users`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
  getUserById(userId: any) {
    return this.Http.get<any>(`${this.baseUrl2}/users?id=${userId}`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
  getClubByUserId(userId: any) {
    return this.Http.get<any>(`${this.baseUrl}/literature_clubs?userId=2`).pipe(
      tap((response) => console.log('API Response of ClubByUserId:', response))
    );

  }

  addUserToClub(clubId: string, userId: string) {

    return this.Http.patch<any>(`${this.baseUrl}/reading-clubs/${clubId}`, { users: [userId] }).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
  createClub(clubName: string, description: string, meetingDate: string, chosenBook: any) {

    const clubData = {
      clubName: clubName,
      meetingDate: meetingDate,
      bookId: chosenBook,
      clubDescription: description,
      userId: null
    };
    return this.Http.post<any>(`${this.baseUrl2}/literature_clubs`, clubData).pipe(
      tap((response) => console.log('Club created:', response))
    );
  }
  PublishComment(content:string){
    return this.Http.post<any>(`${this.baseUrl2}/comments`, {content}).pipe(
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
