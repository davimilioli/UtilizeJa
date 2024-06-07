import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormAuthComponent } from '../components/form-auth/form-auth.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
import { ReloadPageComponent } from '../components/reload-page/reload-page.component';

@NgModule({
  declarations: [FormAuthComponent, HeaderComponent, ReloadPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule 
  ],
  exports: [
    FormAuthComponent,
    HeaderComponent,
    ReloadPageComponent
  ]
})
export class SharedModule {}
