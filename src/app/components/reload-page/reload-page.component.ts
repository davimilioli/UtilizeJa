import { Component, OnInit } from '@angular/core';
import { ReloadPageService } from 'src/app/services/reloadpage/reload-page.service';

@Component({
  selector: 'app-reload-page',
  templateUrl: './reload-page.component.html',
  styleUrls: ['./reload-page.component.scss'],
})
export class ReloadPageComponent  implements OnInit {

  constructor(private reloadPageService: ReloadPageService) { }

  ngOnInit() {}

  refreshPage(){
    this.reloadPageService.reload();
  }
}
