import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  private apiUrl = 'https://66539ff81c6af63f46752fca.mockapi.io/api/v1/users'; // URL de tu API

  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
