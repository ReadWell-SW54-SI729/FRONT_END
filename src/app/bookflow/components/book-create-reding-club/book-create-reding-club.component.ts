import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import { BookflowService } from '../../services/bookflow-service.service';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {BookDialogComponent} from "../book-dialog/book-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-book-create-reding-club',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatLabel,
    NgIf
  ],
  templateUrl: './book-create-reding-club.component.html',
  styleUrl: './book-create-reding-club.component.css'
})
export class BookCreateRedingClubComponent {
  clubName: string = '';
  description: string = '';
  meetingDate: string = '';
  chosenBook: string = '';
  chosenBookImage: string = '';

  constructor(private bookService: BookflowService, public dialog: MatDialog, private router:Router) {}

  createClub() {
    // Verificar si se ha seleccionado un libro
    if (!this.chosenBook) {
      return;
    }

    // Verificar que todos los campos estén llenos antes de crear el club
    if (this.clubName && this.description && this.meetingDate) {
      this.bookService.createClub(this.clubName, this.description, this.meetingDate, this.chosenBook).subscribe(
        (data: any) => {
          console.log('Club created successfully:', data);
          alert('Club created successfully');
          this.resetForm();
        },
        (error) => {
          console.error('Error while creating club:', error);
          alert('Error while creating club');
        }
      );
    } else {
      alert('Por favor complete todos los campos antes de crear el club.');
    }
  }

  resetForm() {
    this.clubName = '';
    this.description = '';
    this.meetingDate = '';
    this.chosenBook = '';
    this.chosenBookImage = '';
  }

  openBookDialog() {
    // Verificar si ya se ha seleccionado un libro
    if (this.chosenBook) {
      // Si ya se ha seleccionado un libro, no es necesario abrir la ventana de diálogo nuevamente
      return;
    }

    // Abrir la ventana de diálogo para seleccionar un libro
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '40%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se selecciona un libro, actualizar la información del libro seleccionado
        this.chosenBook = result.bookIsbn;
        this.chosenBookImage = result.bookImage;
      }
    });
  }

  goBack() {
    this.router.navigate(['Catalogue/reading-club']);
  }

}
