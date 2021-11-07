import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'app/core/storage.service';
import { IReturn } from 'app/models/return';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  url: string = environment.url;

  ValidarUsuario(usuario:string,contrasena:string) {
    return this.http.get<IReturn>(`${this.url}ValidarUsuario?usuario=${usuario}&contrasena=${contrasena}`);
  }

  leertoken(){
    if (this.storageService.leerToken() === '') {
      return false;
    } else {
      return true;
    }
  }

}
