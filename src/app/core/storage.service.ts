import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor() { }

  guardarToken(token: string) { 
    sessionStorage.setItem('token', token);
  }

  leerToken(){
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token')!;
    }
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  
}
