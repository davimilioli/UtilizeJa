import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReloadPageService {

  constructor() { }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.reload();
      event.target.complete();
    }, 2000);
  }

  reload() {
    window.location.reload();
  }
}
