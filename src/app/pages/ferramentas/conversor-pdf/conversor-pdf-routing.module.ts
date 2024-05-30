import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversorPdfPage } from './conversor-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ConversorPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversorPdfPageRoutingModule {}
