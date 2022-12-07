import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  equipo: Observable<any[]>;
  constructor(firestore: AngularFirestore){
    this.equipo = firestore.collection('empleados').valueChanges();
  }
}
