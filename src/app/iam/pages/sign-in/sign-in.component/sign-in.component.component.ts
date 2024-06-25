import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {SignInRequest} from "../../../model/sign-in.request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in.component',
  templateUrl: './sign-in.component.component.html',
  styleUrl: './sign-in.component.component.css'
})
export class SignInComponentComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  submitted=false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService, private router: Router){
    super();
  }

  ngOnInit(): void {
    this.form= this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    if(this.form.invalid) return;
    let username= this.form.value.username;
    let password= this.form.value.password;
    const signInRequest= new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted=true;
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']); // Redirige a la pantalla de registro
  }
}
