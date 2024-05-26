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


  getBooks(){
    return this.Http.get<any>(this.baseUrl).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByIsbn(isbn:string){

    return this.Http.get<any>(`${this.baseUrl}?bookIsbn=${isbn}`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByGenre(genre:string){

      return this.Http.get<any>(`${this.baseUrl}?bookGenre=${genre}`).pipe(
        tap((response) => console.log('API Response:', response))
      );
  }

  getBooksByName(name:string){
    return this.Http.get<any>(`${this.baseUrl}?bookTitle=${name}`).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

}
