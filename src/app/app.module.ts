import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EquipoComponent } from './pages/equipo/equipo.component';

//firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

//modules
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//services
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './servicios/login.service';
import { EmpleadosService } from './servicios/empleados.service';
import { LoginWithGoogleService } from './servicios/login-google.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CrearEmpleadoComponent,
    EmpleadosComponent,
    LoginComponent,
    NosotrosComponent,
    ContactoComponent,
    HomeComponent,
    EquipoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,  
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    CommonModule
  ],
  providers: [CookieService, LoginService, LoginWithGoogleService, EmpleadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
