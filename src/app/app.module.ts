import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import {authenticationInterceptor} from "./shared/services/authentication.interceptor";

@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppComponent
  ],
  providers: [
    provideHttpClient(withInterceptors([authenticationInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
