import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthFormData } from 'src/app/Types';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {}

  async loginFirebase(formData: AuthFormData){
    this.loading = true;
    const auth = await this.authService.signIn(formData.email, formData.password)
    this.loading = false;
    if(auth){
      this.router.navigate(['/tabs/tab4']);
    } else {
      this.toast('Email ou senha incorretos');
    }
  }

  async loginFirebaseGoogle(response: any){
    this.loading = true;
    
    try{
      await this.authService.loginAuthFirebase();
      this.router.navigate(['/tabs/tab4']);
    } catch(error: any) {
      this.toast('Não foi possível autenticar');
    } finally {
      this.loading = false;
      this.toast('Autenticado com sucesso');
    } 
  }

  async logoutFirebase(){
    try{
      await this.authService.logoutAuthFirebase();
    } catch(error: any) {
      console.error('Erro ao da logout')
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
