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
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

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
    NgForOf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userData: User;
  users:User[] = [];
  constructor(private bookService: BookflowService,private router: Router) {
    this.userData = {} as User;
  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.bookService.getUser().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.userData = new User(
            data[0].id,
            data[0].firstName,
            data[0].lastName,
            data[0].age,
            data[0].email,
            data[0].description,
            data[0].bookFavorites
          );
        }
      }
    );
  }


  goToUserClubs() {
    return this.router.navigate(['profile/user-club']);
  }
  onLogin() {
    // Handle profile logic here
  }

  onRegister() {
    // Handle registration logic here
  }
}
