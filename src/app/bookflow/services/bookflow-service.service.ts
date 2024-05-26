import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  BookflowService {
  baseUrl: string = environment.baseUrl; // muetsra todos los libros
  constructor(private Http:HttpClient) { }
  lastId = 9;

  getBooks(){
    return this.Http.get<any>(`${this.baseUrl}/books`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByIsbn(isbn:string){

    return this.Http.get<any>(`${this.baseUrl}/books?bookIsbn=${isbn}`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByGenre(genre:string){

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

}
