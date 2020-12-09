import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CronometroService {

  public contador = 0;

  constructor() { }

  iniciar(): Observable<number>{
    return new Observable <number>(observer =>{
      observer.next(this.contador);
      setInterval(
        () =>{
          this.contador++;
          observer.next(this.contador)
        },2000
      )
    })
  }
}
