import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEstados } from 'app/models/estados';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http:HttpClient) { }

  url: string = environment.url;

  getAll(){
    return this.http.get<IEstados[]>(`${this.url}Estados`);
  }

}
