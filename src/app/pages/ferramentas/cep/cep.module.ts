import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CepPageRoutingModule } from './cep-routing.module';

import { CepPage } from './cep.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CepPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CepPage]
})
export class CepPageModule {}
