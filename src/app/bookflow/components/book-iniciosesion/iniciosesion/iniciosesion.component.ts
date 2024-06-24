import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatCard} from "@angular/material/card"; // Importa Router
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {AuthenticationService} from "../../../../iam/services/authentication.service";
import {SignInRequest} from "../../../../iam/model/sign-in.request";
import {MatError} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, MatCard, MatError, MatButton],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  submitted=false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService){
    super();
  }

  ngOnInit(): void {
    this.form= this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    if(this.form.invalid) return;
    let email= this.form.value.email;
    let password= this.form.value.password;
    const signInRequest= new SignInRequest(email, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted=true;
  }
}
