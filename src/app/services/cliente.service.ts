import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from 'app/models/cliente';
import { IReturn } from 'app/models/return';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  url: string = environment.url;

  get(idcliente: number) {
    return this.http.get<ICliente>(`${this.url}Cliente?idcliente=${idcliente}`);
  }

  put(item: ICliente) {
    return this.http.put<IReturn>(`${this.url}Cliente`, item);
  }


}
