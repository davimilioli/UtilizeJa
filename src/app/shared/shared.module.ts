import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormAuthComponent } from '../components/form-auth/form-auth.component';

@NgModule({
  declarations: [FormAuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    FormAuthComponent // Certifique-se de exportar o FormAuthComponent
  ]
})
export class SharedModule {}
