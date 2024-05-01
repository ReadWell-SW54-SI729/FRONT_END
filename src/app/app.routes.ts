import { Routes } from '@angular/router';
import { BookDetailComponent } from './bookflow/components/book-detail/book-detail.component';
import { BookCardComponent} from "./bookflow/components/book-card/book-card.component";
import {BookHomeComponent} from "./bookflow/components/book-home/book-home.component";
import {BookCommentComponent} from "./bookflow/components/book-comment/book-comment.component";
import {IniciosesionComponent} from "./bookflow/components/book-iniciosesion/iniciosesion/iniciosesion.component";
import {RegistroComponent} from "./bookflow/components/book-registro/registro/registro.component";

export const routes: Routes = [
  {path : 'home', component: BookHomeComponent},
  {path : 'home/Catalogue', component: BookCardComponent},
  {path : 'home/iniciosesion', component: IniciosesionComponent},
  {path : 'home/registro', component: RegistroComponent},
  {path: 'Catalogue/bookDetail/:id', component: BookDetailComponent },
  {path: 'Catalogue/bookDetail/:id/Comment', component: BookCommentComponent },
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**', redirectTo: 'home', pathMatch: 'full'}
];
