import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHistorialCliente } from 'app/models/historialcliente';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialClienteService {

  constructor(private http:HttpClient) { }

  url: string = environment.url;

  getAll(idcliente:number){
    return this.http.get<IHistorialCliente[]>(`${this.url}HistorialCliente?idcliente=${idcliente}`);
  }

}
