import { Routes } from '@angular/router';
import { BookDetailComponent } from './bookflow/components/book-detail/book-detail.component';
import { BookCardComponent} from "./bookflow/components/book-card/book-card.component";
import {BookHomeComponent} from "./bookflow/components/book-home/book-home.component";
import {BookCommentComponent} from "./bookflow/components/book-comment/book-comment.component";

export const routes: Routes = [
  {path : 'home', component: BookHomeComponent},
  {path : 'home/Catalogue', component: BookCardComponent},
  {path: 'Catalogue/bookDetail/:id', component: BookDetailComponent },
  {path: 'Catalogue/bookDetail/:id/Comment', component: BookCommentComponent },
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**', redirectTo: 'home', pathMatch: 'full'}
];
