import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadPageService {

  constructor(private router: Router) { }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.reload();
      event.target.complete();
    }, 2000);
  }

  reload() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
