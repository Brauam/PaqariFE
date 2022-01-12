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
}
export const ROUTES: RouteInfo[] = [
  { path: '/user-profile', title: 'Perfil', icon: 'person', class: '' },
  { path: '/estadocuenta', title: 'Detalle de terapia', icon: 'date_range', class: '' },
  { path: '/informes', title: 'Historial', icon: 'assignment', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
isMobileMenu() {
  if ($(window).width() > 991) {
    return false;
  }
  return true;
};
}
