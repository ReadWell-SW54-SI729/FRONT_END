import { Component } from '@angular/core';
import {RegistrarService} from "../../../services/registrar/registrar.service";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule, MatButtonModule, MatDialogModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(private postService: RegistrarService, private router: Router, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  sendData() {
    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }
    this.postService.postData(data).subscribe(response => {
      console.log('Response from API:', response);
      this.openDialog();
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error:', error);
    });
  }
}

@Component({
  selector: 'dialog.component',
  templateUrl: '../../../../public/components/dialog/dialog/dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {}
