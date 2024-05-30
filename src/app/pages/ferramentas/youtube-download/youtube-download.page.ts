import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-download',
  templateUrl: './youtube-download.page.html',
  styleUrls: ['./youtube-download.page.scss'],
})
export class YoutubeDownloadPage implements OnInit {

  urlVideo: string = '';


  constructor() { }

  ngOnInit() {

  }

  pesquisar() {
    console.log(this.urlVideo);
    // Aqui você pode adicionar a lógica para pesquisar com base na URL do vídeo
  }

}
