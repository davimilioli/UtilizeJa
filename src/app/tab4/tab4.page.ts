import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MessagesService } from '../services/messages/messages.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
  user: firebase.User | null = null;

  constructor(private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(){
    this.initializeUser();
  } 

 async initializeUser() {
    try {
      this.user = await this.authService.initializeUser();
      console.log(this.user)
    } catch (error) {
      this.messagesService.toast('Erro ao inicializar usuário');
      //console.error('Erro ao inicializar usuário', error);
    }
  } 

  async logoutFirebase(){
    try {
      await this.authService.logoutAuthFirebase();
      this.user = null;
      this.router.navigate(['/login']);
    } catch(error: any) {
      this.messagesService.toast('Erro ao fazer logout');
      //console.error('Erro ao fazer logout', error);
    }
  }


}
