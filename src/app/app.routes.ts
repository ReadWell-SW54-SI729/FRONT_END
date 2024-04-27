import { Routes } from '@angular/router';
import { BookDetailComponent } from './bookflow/components/components/book-detail/book-detail.component';
import { BookCardComponent} from "./bookflow/components/components/book-card/book-card.component";

export const routes: Routes = [
  {path : 'home', component: BookCardComponent},
  { path: 'bookDetail/:id', component: BookDetailComponent },
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**', redirectTo: 'home', pathMatch: 'full'}
];
