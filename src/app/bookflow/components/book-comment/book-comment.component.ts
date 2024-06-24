import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BookflowService} from "../../services/bookflow-service.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-book-comment',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './book-comment.component.html',
  styleUrl: './book-comment.component.css'
})
export class BookCommentComponent {
  comentario: string = ''; // Variable para almacenar el contenido del comentario

  constructor(private _snackBar: MatSnackBar, private bookService: BookflowService) {}

  enviarMensaje() {
    // Verifica que el comentario no esté vacío antes de enviarlo
    if (this.comentario.trim() === '') {
      this.mostrarSnackBar('El comentario no puede estar vacío');
      return;
    }

    // Llama al servicio para publicar el comentario
    this.bookService.PublishComment(this.comentario).subscribe(
      () => {
        this.mostrarSnackBar('Mensaje enviado correctamente');
        this.comentario = ''; // Limpia el campo de comentario después de enviarlo con éxito
      },
      error => {
        console.error('Error al enviar el comentario:', error);
        this.mostrarSnackBar('Error al enviar el comentario');
      }
    );
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración de la Snackbar en milisegundos (3 segundos en este caso)
      horizontalPosition: 'center', // Posición horizontal del mensaje
      verticalPosition: 'bottom' // Posición vertical del mensaje
    });
  }
}
