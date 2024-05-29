import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { NotepadPageRoutingModule } from './notepad-routing.module';

import { NotepadPage } from './notepad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotepadPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotepadPage]
})
export class NotepadPageModule {}
