import { Routes } from '@angular/router';
import { BookDetailComponent } from './bookflow/components/book-detail/book-detail.component';
import { BookCardComponent} from "./bookflow/components/book-card/book-card.component";
import {BookHomeComponent} from "./bookflow/components/book-home/book-home.component";
import {BookCommentComponent} from "./bookflow/components/book-comment/book-comment.component";
import {IniciosesionComponent} from "./bookflow/components/book-iniciosesion/iniciosesion/iniciosesion.component";
import {RegistroComponent} from "./bookflow/components/book-registro/registro/registro.component";
import {BookTendenciaComponent} from "./bookflow/components/book-tendencia/book-tendencia.component";
import {AutorComponent} from "./bookflow/components/book-listas/lista-autores/autor.component";
import {LecturaComponent} from "./bookflow/components/book-listas/lista-lecturas/lectura.component";
import {ProfileComponent} from "./bookflow/components/book-profile/profile/profile.component";
import { BookEditprofileComponent } from "./bookflow/components/book-editprofile/book-editprofile.component";

export const routes: Routes = [
  {path : 'home', component: BookHomeComponent},
  {path : 'home/Catalogue', component: BookCardComponent},
  {path : 'home/iniciosesion', component: IniciosesionComponent},
  {path : 'home/registro', component: RegistroComponent},
  {path : 'home/profile/editprofile', component: BookEditprofileComponent},
  {path : 'home/tendencia', component: BookTendenciaComponent},
  {path: 'Catalogue/bookDetail/:id', component: BookDetailComponent },
  {path: 'Catalogue/bookDetail/:id/Comment', component: BookCommentComponent },
  {path: 'Catalogue/bookListLectures', component: LecturaComponent },
  {path: 'Catalogue/bookListAuthors', component: AutorComponent },
  {path : 'home/profile', component: ProfileComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**', redirectTo: 'home', pathMatch: 'full'}
];
