import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthFormData } from 'src/app/Types';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService,
    private router: Router,
    private messagesService: MessagesService) { }

  ngOnInit() {
  }

  async registerLoginFirebase(formData: AuthFormData){
    const sucess = await this.authService.createSign(formData.email, formData.password);

    if(!sucess){
      this.messagesService.toast('Erro ao criar usuário');
    } 
    
    this.router.navigate(['/login']);
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


}
