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

  async loginFirebaseGoogle(response: any){

    try{
      await this.authService.loginAuthFirebase();
      this.router.navigate(['/tabs/tab4']);
    } catch(error: any) {
      this.messagesService.toast('Não foi possível autenticar');
    } finally {
      this.messagesService.toast('Autenticado com sucesso');
      return true;
    } 
  }


}
