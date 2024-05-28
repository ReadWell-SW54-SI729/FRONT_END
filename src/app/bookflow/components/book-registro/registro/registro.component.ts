import { Component } from '@angular/core';
import {RegistrarService} from "../../../services/registrar/registrar.service";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(private postService: RegistrarService, private router: Router) { }

  sendData() {

    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }
    this.postService.postData(data).subscribe(response => {
      console.log('Response from API:', response);
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error:', error);
    });
  }
}
