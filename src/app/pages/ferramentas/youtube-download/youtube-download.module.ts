import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoutubeDownloadPageRoutingModule } from './youtube-download-routing.module';

import { YoutubeDownloadPage } from './youtube-download.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoutubeDownloadPageRoutingModule
  ],
  declarations: [YoutubeDownloadPage]
})
export class YoutubeDownloadPageModule {}
