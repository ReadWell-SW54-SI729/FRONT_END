import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {AuthenticationService} from "../../../services/authentication.service";
import {SignUpRequest} from "../../../model/sign-up.request";

@Component({
  selector: 'app-sign-up.component',

  templateUrl: './sign-up.component.component.html',
  styleUrl: './sign-up.component.component.css'
})
export class SignUpComponentComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  submitted= false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService){
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.form.invalid) return;
    let username= this.form.value.username;
    let password= this.form.value.password;
    const signUpRequest = new SignUpRequest(username, password);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }
}
