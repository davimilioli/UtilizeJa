import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.startApp();
  }

  startApp() {
    this.platform.ready().then(() => {
      const authenticated = false;
      return authenticated ? this.router.navigate(['/tabs/tab1']) :  this.router.navigate(['/introducao']);
    });
  }
}
