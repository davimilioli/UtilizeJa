import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormAuthComponent } from '../components/form-auth/form-auth.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormAuthComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule 
  ],
  exports: [
    FormAuthComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
