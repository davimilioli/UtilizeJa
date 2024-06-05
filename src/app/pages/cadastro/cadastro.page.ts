import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthFormData } from 'src/app/Types';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(public authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async registerLoginFirebase(formData: AuthFormData){
    const sucess = await this.authService.createSign(formData.email, formData.password);

    if(!sucess){
      this.toast('Erro ao criar usuário');
    } 
    
    this.router.navigate(['/login']);
  }

  async loginFirebaseGoogle(response: any){

    try{
      await this.authService.loginAuthFirebase();
      this.router.navigate(['/tabs/tab4']);
    } catch(error: any) {
      this.toast('Não foi possível autenticar');
    } finally {
      this.toast('Autenticado com sucesso');
      return true;
    } 
  }

  async toast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

}
