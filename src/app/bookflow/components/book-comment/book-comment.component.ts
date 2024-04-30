import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-book-comment',
  standalone: true,
  imports: [],
  templateUrl: './book-comment.component.html',
  styleUrl: './book-comment.component.css'
})
export class BookCommentComponent {
  constructor(private _snackBar: MatSnackBar) {}

  enviarMensaje() {
    // Aquí enviarías el mensaje
    // Después de enviar el mensaje, muestras la Snackbar
    this.mostrarSnackBar('Mensaje enviado correctamente');
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración de la Snackbar en milisegundos (3 segundos en este caso)
      horizontalPosition: 'center', // Posición horizontal del mensaje
      verticalPosition: 'bottom' // Posición vertical del mensaje
    });
  }
}
