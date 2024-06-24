import { Routes } from '@angular/router';
import { BookDetailComponent } from './bookflow/components/book-detail/book-detail.component';
import { BookCardComponent} from "./bookflow/components/book-card/book-card.component";
import { BookHomeComponent} from "./bookflow/components/book-home/book-home.component";
import { BookCommentComponent} from "./bookflow/components/book-comment/book-comment.component";
import { IniciosesionComponent} from "./bookflow/components/book-iniciosesion/iniciosesion/iniciosesion.component";
import { RegistroComponent} from "./bookflow/components/book-registro/registro/registro.component";
import { BookTendenciaComponent} from "./bookflow/components/book-tendencia/book-tendencia.component";
import { AutorComponent} from "./bookflow/components/book-listas/lista-autores/autor.component";
import { LecturaComponent} from "./bookflow/components/book-listas/lista-lecturas/lectura.component";
import { ProfileComponent} from "./bookflow/components/book-profile/profile/profile.component";
import { BookEditprofileComponent } from "./bookflow/components/book-editprofile/book-editprofile.component";
import { ReadingClubComponent} from "./bookflow/components/book-reading-club/reading-club/reading-club.component";
import { BookCreateRedingClubComponent} from "./bookflow/components/book-create-reding-club/book-create-reding-club.component";
import { BookUserClubComponent } from './bookflow/components/book-user-club/book-user-club.component';
import { RecommendFriendsComponent} from "./bookflow/components/book-recommend/recommend-friends/recommend-friends.component";
import { BookSubscriptionComponent } from './bookflow/components/book-subscription/book-subscription.component';
import { PaymentDetailsComponent } from './bookflow/components/payment-details/payment-details.component';
import {SignInComponentComponent} from "./iam/pages/sign-in/sign-in.component/sign-in.component.component";
import {SignUpComponentComponent} from "./iam/pages/sign-up/sign-up.component/sign-up.component.component";
import {AuthenticationSectionComponentComponent} from "./iam/components/authentication-section.component/authentication-section.component.component";
export const routes: Routes = [
  {path : 'home', component: BookHomeComponent},
  {path : 'home/Catalogue', component: BookCardComponent},
  {path : 'sign-in', component: SignInComponentComponent},
  {path : 'sign-up', component: SignUpComponentComponent},
  {path : 'home/profile/editprofile', component: BookEditprofileComponent},
  {path : 'home/tendencia', component: BookTendenciaComponent},
  {path : 'Catalogue/bookDetail/:id', component: BookDetailComponent },
  {path : 'Catalogue/bookDetail/:id/Comment', component: BookCommentComponent },
  {path : 'Catalogue/bookDetail/:id/Recommend', component: RecommendFriendsComponent },
  {path : 'Catalogue/bookListLectures', component: LecturaComponent },
  {path : 'Catalogue/bookListAuthors', component: AutorComponent },
  {path : 'Catalogue/reading-club', component: ReadingClubComponent},
  {path : 'Catalogue/reading-club/create-club', component: BookCreateRedingClubComponent},
  {path : 'profile/user-club', component: BookUserClubComponent},
  {path : 'home/profile', component: ProfileComponent},
  {path : 'home/subscription', component: BookSubscriptionComponent}, // Nueva ruta agregada
  {path : 'home/subscription/details', component: PaymentDetailsComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**', redirectTo: 'home', pathMatch: 'full'},
];
