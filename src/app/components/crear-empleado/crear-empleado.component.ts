import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../../servicios/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {
  crearEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null ;
  titulo = 'Agregar Empleado'

  //se inyecta el servicio empleados 
  constructor(private fb: FormBuilder, private empleadosService: EmpleadosService, 
    private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) {
    //validacion de formulario
    this.crearEmpleado = this.fb.group({
      //los campos comienzan vacios, se requiere validacion (campos obligatorios)
      name: ['', Validators.required],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      department: ['', Validators.required],
      job: ['', Validators.required],
    })

    this.id = this.aRoute.snapshot.paramMap.get('id')
    console.log(this.id)
  }

  ngOnInit(): void {
    this.editarEmpleado
  }

  agregarEditarEmpleado() {
    this.submitted = true;
    // no deja enviar el formulario si no se completan todos los cambios
    if (this.crearEmpleado.invalid){
      return;
    }
    if (this.id == null){
      this.agregarEmpleado()
    }else {
      this.editar(this.id)
    }
  }

  agregarEmpleado(){
     //el objteto empleado se envia a firebase para almacenar con datos del form
     const empleado:any = {
      //los campos se rellenan con los vlaores ingresados
      name: this.crearEmpleado.value.name,
      dni: this.crearEmpleado.value.dni,
      address: this.crearEmpleado.value.address,
      number: this.crearEmpleado.value.number,
      department: this.crearEmpleado.value.department,
      job: this.crearEmpleado.value.job,
    }

    //mientras se envia el formulario, aparace el spinner
    this.loading = true;

    console.log(empleado);

    /* recibe como parametro empleado y retorna una promesa */
    this.empleadosService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('El empleado fue añadido de manera exitosa', 'Empleado registrado',{
        positionClass: 'toast-top-right'
      })
      //una vez que se retorna la promesa, el spinner desaparece
      this.loading = false;
      this.router.navigate(['/empleados'])
    }).catch(error => {
      console.log(error)
      this.loading = false;
      this.toastr.error('El empleado no se pudo registrar', 'Ocurrió un error :(',{
        positionClass: 'toast-top-right'
      })
    })
  }

  editar(id: string){
    const empleado:any = {
      //los campos se rellenan con los vlaores ingresados
      name: this.crearEmpleado.value.name,
      dni: this.crearEmpleado.value.dni,
      address: this.crearEmpleado.value.address,
      number: this.crearEmpleado.value.number,
      department: this.crearEmpleado.value.department,
      job: this.crearEmpleado.value.job,
    }

    this.loading = true;
    this.empleadosService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado se editó de manera exitosa', 'Empleado modificado',{
        positionClass: 'toast-top-right'
      })
      this.router.navigate(['/empleados'])
    })
  }

  editarEmpleado(){
    this.titulo = 'Editar Empleado'
    //este metodo se ejecuta solo cuando el id tenga un valor
    if (this.id != null) {
      this.loading = true
      this.empleadosService.editEmpleado(this.id).subscribe(data => {
        this.loading = false
        console.log(data)
        //rellena los valores de los campos con los de la base de datos
        this.crearEmpleado.setValue({
          name: data.payload.data()['name'],
          dni: data.payload.data()['dni'],
          address: data.payload.data()['address'],
          number: data.payload.data()['number'],
          department: data.payload.data()['department'],
          job: data.payload.data()['job']
        })
      })
    }
  }

}
