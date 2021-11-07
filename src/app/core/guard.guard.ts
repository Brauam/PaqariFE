import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor( private router: Router,private storageService:StorageService) {
  }

  
  canActivate():boolean {
    if (this.storageService.leerToken()) {
      return true;
    } else {      
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
