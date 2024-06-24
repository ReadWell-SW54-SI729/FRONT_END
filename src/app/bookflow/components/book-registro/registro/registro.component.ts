import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {SignUpRequest} from "../../../../iam/model/sign-up.request";
import {AuthenticationService} from "../../../../iam/services/authentication.service";
import {MatError} from "@angular/material/form-field";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatError, NgIf],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  submitted= false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService){
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['ROLE_USER', Validators.required]

    })
  }

  onSubmit(){
    if(this.form.invalid) return;
    let username= this.form.value.username;
    let password= this.form.value.password;
    let roles = this.form.value.password;
    const signUpRequest = new SignUpRequest(username, password);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }
}
