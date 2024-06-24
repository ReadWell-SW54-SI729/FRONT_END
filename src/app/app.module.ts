import { NgModule } from '@angular/core';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {BookflowService} from "./bookflow/services/bookflow-service.service";
import { AppComponent } from './app.component';
import { RegistroComponent } from './bookflow/components/book-registro/registro/registro.component';
import {authenticationInterceptor} from "./iam/services/authentication.interceptor";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {AuthenticationSectionComponentComponent} from "./iam/components/authentication-section.component/authentication-section.component.component";
import {NgIf} from "@angular/common";
import {SignInComponentComponent} from "./iam/pages/sign-in/sign-in.component/sign-in.component.component";
import {SignUpComponentComponent} from "./iam/pages/sign-up/sign-up.component/sign-up.component.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AuthenticationSectionComponentComponent,
    SignInComponentComponent,
    SignUpComponentComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RegistroComponent,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    AppComponent,
    NgIf,
    ReactiveFormsModule

  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    BookflowService

  ],
  exports: [
    AuthenticationSectionComponentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
