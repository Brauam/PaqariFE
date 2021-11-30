import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaises, IUbigeo } from 'app/models/ubigeo';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http:HttpClient) { }

  url: string = environment.url;

  ListarPaises(){
    return this.http.get<IPaises[]>(`${this.url}ListarPaises`);
  }

  ListarDepartamento(){
    return this.http.get<IUbigeo[]>(`${this.url}ListarDepartamento`);
  }

  ListarProvincia(codigo:string){
    return this.http.get<IUbigeo[]>(`${this.url}ListarProvincia?codigo=${codigo}`);
  }

  ListarDistrito(codigo:string){
    return this.http.get<IUbigeo[]>(`${this.url}ListarDistrito?codigo=${codigo}`);
  }

}
