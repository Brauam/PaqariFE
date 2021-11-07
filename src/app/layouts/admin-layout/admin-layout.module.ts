import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { EstadocuentaComponent } from 'app/estadocuenta/estadocuenta.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterBankaccountsComponent } from 'app/components/footer-bankaccounts/footer-bankaccounts.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from 'app/login/login.component';
import { InformesComponent } from 'app/informes/informes.component';
import { LoadingComponent } from 'app/components/loading/loading.component';



@NgModule({
  imports: [
    MatNativeDateModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
  ],
  declarations: [
    EstadocuentaComponent,
    FooterBankaccountsComponent,
    LoadingComponent,
    LoginComponent,
    InformesComponent
  ]
})

export class AdminLayoutModule { }
