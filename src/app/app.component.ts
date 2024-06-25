import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { MessagesService } from './services/messages/messages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: firebase.User | null = null;
  constructor(private platform: Platform,
    private router: Router, 
    private authService: AuthService,
    private messagesService: MessagesService
  ) {

    if(environment.production === true){
      this.startApp();
    }
  }

  startApp() {
    this.platform.ready().then(() => {
      this.checkUser();
    });
  }

  async checkUser() {
    try {
      this.user = await this.authService.initializeUser();
      if (this.user) {
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.router.navigate(['/introducao']);
      }
    } catch (error) {
      this.messagesService.toast('Erro ao inicializar usuário');
    }
  }
}
