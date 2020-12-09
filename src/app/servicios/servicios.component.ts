import { Component, OnInit } from '@angular/core';
import { SumarService } from '../sumar.service';
import { CronometroService } from '../cronometro.service';
import { ClienteService } from '../cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  form: FormGroup;

  obs;

  usuarios;

  usuario;

  crono;

  suma;

  estadoCrearProducto: string = "Producto aún no creado";

  constructor(
    public sumar: SumarService,
    public cronometro: CronometroService,
    public cliente: ClienteService,
    public fn: FormBuilder,
    public route: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fn.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required]
    })

  }
  //sumar
  mostrarSuma() {
   this.suma = this.sumar.sumarNumeros(12, 12)
      
  }

  //iniciar cronometro
  iniciar() {
    this.obs = this.cronometro.iniciar().subscribe(
      (crono) =>this.crono = crono,
      error => console.log(error),
      () => console.log("digitos completados")
    )
  }

  desuscribirse() {
    this.obs.unsubscribe();
  }

  pedirUsuarios() {
    //se hace la llamada http y la respuesta del cliente de Angular será un observable
    //por lo tanto debemos suscribirnos a el para obtener el valor de retorno, ya sea
    //la descarga esperada o un error
    this.cliente.getRequestAllProducts('http://localhost:5000/usuarios').subscribe(
      //capturamos el valor de descarga emitido por next() del observable y extraemos del json
      //el valor de la porpiedad "datos" con el cual definimos la porpiedad productos que estamos
      //interpolando en el HTML
      (data): any => this.usuarios = data["datos"],
      error => console.log("Ha ocurrido un error en la llamada: ", error)
    )
  }

  pedirUsuario() {
    this.cliente.getRequestIdProduct('http://localhost:5000/consultarusuario', 1).subscribe(
      (data): any => this.usuario = data["datos"],
      error => console.log("Ha ocurrido un error en la llamada")
    )
  }

  crearUsuario() {
    this.cliente.postRequestCreateProduct('http://localhost:5000/registro', { cedula: "cedula", nombres: "nombres", apellidos: "apellidos" }).subscribe(
      data => this.estadoCrearProducto = data["status"],
      error => console.log("Ha ocurrido un error en la llamada")
    )
  }

  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.cliente.postRequestSendForm('http://localhost:5000/registro',{
        cedula: this.form.value.cedula,
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos
        
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          //se imprime la respuesta del server
          console.log(response);
          //se guarda el valor de la propiedad email en el almacenamiento local persistente
          //localStorage.setItem('status', response.status)
          //se guarda el valor de la propiedad password en el almacenamiento local por sesión
          //estos datos se borran tan pronto el usuario cierra la ventana
         // sessionStorage.setItem('pass', response.pas)
          //recuperamos el valor de la porpiedad email guardada anteriormete y la imprimimos
          //console.log(localStorage.getItem('cedula',));
          //dirigimos al usuario a la ruta /ayuda
          this.route.navigate(['/ayuda']);
        },
        //si ocurre un error en el proceso de envío del formulario...
        (error) => {
          //se imprime el status del error
          console.log(error.status);
        })
      //si ocurrio un error en la validacion del formulario este no se enviara
      //y se imprimira el mensaje "Form error"
    } else {
      console.log("Form error");
    }
  }

}
