import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {User} from "../../../model/user.model";

import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatList, MatListItem} from "@angular/material/list";
import {BookflowService} from "../../../services/bookflow-service.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AuthenticationService} from "../../../../iam/services/authentication.service";
import {Book} from "../../../model/book.model";

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
    MatCardContent,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentid: any = '';
  user : User;
  id=1;
  constructor(private authenticationService: AuthenticationService, private bookflowService : BookflowService) {
    this.user = {} as User;
  }

  ngOnInit() {
    this.authenticationService.currentUserId.subscribe((id) => {
      this.currentid = id;
      console.log('Current Username:', this.currentid); // Añadir para verificar en consola
    });
    this.getUserById();
  }
  getUserById() {

    this.bookflowService.getUserById(this.id).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.user = new User(
            data[this.id].id,
            data[this.id].username,
            data[this.id].role
          );
        } else {
          console.error('No books data found in the response.');
        }
      },
      (error) => {
        console.error('Error retrieving books:', error);
      }
    );
  }
  onSignOut() {
    this.authenticationService.signOut();
  }
}
