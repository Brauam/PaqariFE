import { Routes } from '@angular/router';

import { EstadocuentaComponent } from 'app/estadocuenta/estadocuenta.component';
import { InformesComponent } from 'app/informes/informes.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'estadocuenta', component: EstadocuentaComponent },
    { path: 'informes', component: InformesComponent },
];
