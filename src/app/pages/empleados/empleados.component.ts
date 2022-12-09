import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmpleadosService } from 'src/app/servicios/empleados.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  //inicia un array vacio donde se guardan los datos de firebase
  empleados: any[] = [];

  constructor(private empleadosService: EmpleadosService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  /* un observable no se consume hasta que se suscribe a él 
  suscribirse a un observable es llamar a que la funcion sea ejecutada*/
  getEmpleados() {
    this.empleadosService.getEmpleados().subscribe(data => {
      //cada vez que se ejecute getEmpleados
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          //se crea un nuevo objeto donde se indica el id de cada elto 
          id: element.payload.doc.id,
          //spread operator con copia del objeto elemento.datos donde se encuentran todos los datos del form
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados)
    })
  }

  eliminarEmpleado(id: string) {
    this.empleadosService.eliminarEmpleado(id).then(() => {
      console.log('empleado eliminado de manera exitosa')
      this.toastr.success('El empleado se eliminó con éxito', 'Empleado eliminado',{
        positionClass: 'toast-top-right'
      })
    }).catch(error => {
      (console.error)
      this.toastr.error('El empleado no pudo ser eliminado', 'Ocurrió un error :(',{
        positionClass: 'toast-top-right'
      })
    })
  }

}
