import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EquipoComponent } from './pages/equipo/equipo.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'contacto', component:ContactoComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'sobre-nosotros', component: NosotrosComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'lista-empleados', component: EmpleadosComponent },
  { path: 'agregar-empleado', component: CrearEmpleadoComponent },
  { path: 'crear-empleado', component: CrearEmpleadoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
