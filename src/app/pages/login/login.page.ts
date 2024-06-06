import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Router } from '@angular/router';
import { AuthFormData } from 'src/app/Types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService, private router: Router, private messagesService: MessagesService) { }

  ngOnInit() {}

  async loginFirebase(formData: AuthFormData){
    this.loading = true;
    const auth = await this.authService.signIn(formData.email, formData.password)
    this.loading = false;
    if(auth){
      this.router.navigate(['/tabs/tab4']);
    } else {
      this.messagesService.toast('Email ou senha incorretos');
    }
  }

  async loginFirebaseGoogle(){
    this.loading = true;
  
    try {
      await this.authService.loginAuthFirebase();

      const user = this.authService.currentUser;
      if (user) {
        this.router.navigate(['/tabs/tab4']);
        this.messagesService.toast('Autenticado com sucesso');
      } else {
        this.messagesService.toast('Não foi possível autenticar');
      }
    } catch(error: any) {
      this.messagesService.toast('Não foi possível autenticar');
    } finally {
      this.loading = false;
    }
  }
  

  async logoutFirebase(){
    try{
      await this.authService.logoutAuthFirebase();
    } catch(error: any) {
      console.error('Erro ao da logout')
    }
  }
}
