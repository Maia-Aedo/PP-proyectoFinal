import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  constructor(private firestore: AngularFirestore) { }

  /* se reciben los datos del formulario empleados y se integran dentro de firestore
  es una funicion async por lo que retorna una promesa */
  agregarEmpleado(empleado:Empleado): Promise<any>{
    //retorna coleccion de empleados y agrega empleado | retorna promesa
    return this.firestore.collection('empleados').add(empleado);
  }

  /* un observable observa los cambios y retorna una suscripcion a eventos que permiten realizar
  acciones cuando cambia lo que se esta observando | implementado en funciones callback */
  getEmpleados(): Observable<any>{
    /* snapchotchanges captura los cambios y sincroniza para verlos en tiempo real
    ordena los datos por apellido de manera ascendente */
    return this.firestore.collection('empleados', ref => ref.orderBy('name', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any>{
    //delete devuelve una promesa
    return this.firestore.collection('empleados').doc(id).delete()
  }

  editEmpleado(id:string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges()
  }

  actualizarEmpleado(id: string, data:any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data)
  }

}
