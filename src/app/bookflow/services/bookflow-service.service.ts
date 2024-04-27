import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  BookflowService {
  baseUrl: string = environment.baseUrl; // muetsra todos los libros
  //baseUrl2: string = environment.baseUrl2; // muestra un libro por isbn
  constructor(private Http:HttpClient) { }


  getBooks(){
    /*
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '6643c6ee24mshd5171ccc171b4cdp1ebbffjsnb085d3f31986',
      'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com'
    });
     */
    return this.Http.get<any>(this.baseUrl/*, { headers: headers }*/).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }

  getBooksByName(isbn:string){
   /* const headers = new HttpHeaders({
      'X-RapidAPI-Key': '6643c6ee24mshd5171ccc171b4cdp1ebbffjsnb085d3f31986',
      'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com'
    });
    */
    return this.Http.get<any>(`${this.baseUrl}?bookIsbn=${isbn}`/*, { headers: headers }*/).pipe(
      tap((response) => console.log('API Response:', response))
    );
  }
}
