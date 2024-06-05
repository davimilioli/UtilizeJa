import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversorPdfPageRoutingModule } from './conversor-pdf-routing.module';

import { ConversorPdfPage } from './conversor-pdf.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversorPdfPageRoutingModule,
    SharedModule
  ],
  declarations: [ConversorPdfPage]
})
export class ConversorPdfPageModule {}
