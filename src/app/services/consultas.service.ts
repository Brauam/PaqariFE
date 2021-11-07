import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConsultas } from 'app/models/consultas';
import { IEstadoCuenta } from 'app/models/estadocuenta';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http:HttpClient) { }

  url: string = environment.url;

  Consultas(idcliente:number,idestado:number){
    return this.http.get<IConsultas[]>(`${this.url}consultas?idcliente=${idcliente}&idestado=${idestado}`);
  }

  DetalleConsultas(idconsulta:number){
    return this.http.get<IEstadoCuenta[]>(`${this.url}Reports?idconsulta=${idconsulta}`);
  }

}
