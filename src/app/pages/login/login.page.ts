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

  constructor(public authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {}

  async loginFirebase(formData: AuthFormData){
    console.log(formData)
/*     try{
      this.loading = true;
      await this.authService.loginAuthFirebase();
      this.router.navigate(['/tabs/tab4']);
    } catch(error: any) {
      console.error('Deu erro');
    } finally {
      this.loading = false;
    } */
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
