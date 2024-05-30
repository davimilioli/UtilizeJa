import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversorPdfPageRoutingModule } from './conversor-pdf-routing.module';

import { ConversorPdfPage } from './conversor-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversorPdfPageRoutingModule
  ],
  declarations: [ConversorPdfPage]
})
export class ConversorPdfPageModule {}
