import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/storage.service';
import { ClienteService } from 'app/services/cliente.service';
import { elementAt } from 'rxjs-compat/operator/elementAt';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  view: number;
}
export const ROUTES: RouteInfo[] = [
  { path: '/user-profile', title: 'Perfil', icon: 'person', class: '', view: 0 },
  { path: '/estadocuenta', title: 'Estado de cuenta', icon: 'shopping_bag', class: '', view: 1 },
  { path: '/informes', title: 'Historial', icon: 'assignment', class: '', view: 1 },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  idcliente: number;
  constructor(private clienteService: ClienteService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.idcliente = +this.storageService.leerToken();
    this.clienteService.get(this.idcliente).subscribe(res => {
      ROUTES.forEach(element =>
        {
          if (res.ActInformacion) {
            element.view = 1
          }
        }
      )
    })
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
isMobileMenu() {
  if ($(window).width() > 991) {
    return false;
  }
  return true;
};
}
