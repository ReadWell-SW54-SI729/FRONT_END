import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BookflowService } from "../../../services/bookflow-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Book } from "../../../model/book.model";
import { NgForOf, CommonModule } from "@angular/common";

@Component({
  selector: 'app-club-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css']
})
export class ClubCreateComponent implements OnInit {
  clubName: string = '';
  clubDescription: string = '';
  clubCategory: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(
    private bookService: BookflowService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Inicialización del componente
  }

  createClub(): void {
    // Restablecer los indicadores de mensaje
    this.showSuccess = false;
    this.showError = false;

    // Validar que todos los campos estén llenos
    if (this.clubName && this.clubDescription && this.clubCategory) {
      // Aquí puedes agregar la lógica para crear el club de lectura
      // Por ejemplo, puedes hacer una solicitud a un servicio o API

      // Simulación de creación exitosa
      console.log('Club de lectura creado:', {
        nombre: this.clubName,
        descripcion: this.clubDescription,
        categoria: this.clubCategory
      });

      // Mostrar el mensaje de éxito
      this.showSuccess = true;

      // Restablecer los campos del formulario
      this.clubName = '';
      this.clubDescription = '';
      this.clubCategory = '';
    } else {
      // Mostrar un mensaje de error si algún campo está vacío
      this.showError = true;
    }
  }


}
