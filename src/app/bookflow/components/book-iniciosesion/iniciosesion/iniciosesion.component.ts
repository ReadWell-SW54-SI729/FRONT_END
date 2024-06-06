import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router




@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent {
  loginForm: FormGroup; // Definir un FormGroup para el formulario
  loginSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { // Inyectar Router en el constructor
    this.loginForm = this.formBuilder.group({ // Configurar el formulario y sus validaciones
      username: ['', Validators.required], // Campo de usuario requerido
      password: ['', Validators.required] // Campo de contraseña requerido
    });
  }

  onSubmit() {
    if (this.loginForm.valid) { // Verificar si el formulario es válido antes de enviarlo
      console.log('Formulario válido. Iniciando sesión:', this.loginForm.value.username);
      this.loginSuccess = true; // Marcar la sesión como exitosa

      setTimeout(() => {
        console.log('Redirigiendo a la página de inicio...');
        this.router.navigate(['/home/Catalogue']); // Redirecciona a home/Catalogue después de 2 segundos
      }, 2000);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos.');
    }
  }
}
