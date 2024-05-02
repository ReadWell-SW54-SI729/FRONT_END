import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";


import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    MatTab,
    MatList,
    MatTabGroup,
    MatListItem,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    MatIconButton,
    MatCardContent
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin() {
    // Handle profile logic here
  }

  onRegister() {
    // Handle registration logic here
  }
}
