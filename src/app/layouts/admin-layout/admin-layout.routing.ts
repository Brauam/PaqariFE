import { Routes } from '@angular/router';

import { EstadocuentaComponent } from 'app/estadocuenta/estadocuenta.component';
import { InformesComponent } from 'app/informes/informes.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'estadocuenta', component: EstadocuentaComponent },
    { path: 'informes', component: InformesComponent },
];
