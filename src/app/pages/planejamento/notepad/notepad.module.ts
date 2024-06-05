import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { NotepadPageRoutingModule } from './notepad-routing.module';

import { NotepadPage } from './notepad.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotepadPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [NotepadPage]
})
export class NotepadPageModule {}
