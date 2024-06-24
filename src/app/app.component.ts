import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./public/components/header/header.component";
import {BookCardComponent} from "./bookflow/components/book-card/book-card.component";
import {FooterComponent} from "./public/components/footer/footer.component";
import {FormsModule} from '@angular/forms';
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BookCardComponent, FooterComponent, FormsModule, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-bookflow-test';
}
