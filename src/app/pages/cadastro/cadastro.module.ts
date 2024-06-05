import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { SharedModule } from 'src/app/shared/shared.module';
//import { FormAuthComponent } from 'src/app/components/form-auth/form-auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}
