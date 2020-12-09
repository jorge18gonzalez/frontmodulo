import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SumarService {
     numero1:Number =12;
     numero2:Number = 5;


  constructor() {
    
   }

  //metodo para sumar
  sumarNumeros(numero1 , numero2){
    let resultado = (numero1+numero2)
       return resultado;
  }
}
