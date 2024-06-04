import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { HistoricItem } from '../Types';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
  user: firebase.User | null = null;

  constructor(private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  historic: HistoricItem[] = [
    { day: 'Seg', progress: 25 },
    { day: 'Ter', progress: 90 },
    { day: 'Quar', progress: 92 },
    { day: 'Qui', progress: 49 },
    { day: 'Sex', progress: 58 },
    { day: 'Sab', progress: 92 },
    { day: 'Dom', progress: 100 }
  ];

  ngOnInit(){
    this.initializeUser();
  } 

 async initializeUser() {
    try {
      this.user = await this.authService.initializeUser();
      console.log(this.user)
    } catch (error) {
      this.toast('Erro ao inicializar usuário');
      //console.error('Erro ao inicializar usuário', error);
    }
  } 
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.historic = this.historic.map((item: HistoricItem) => ({ ...item, animated: true }));
    }, 1000);
  }

  async logoutFirebase(){
    try {
      await this.authService.logoutAuthFirebase();
      this.user = null;
      this.router.navigate(['/login']);
    } catch(error: any) {
      this.toast('Erro ao fazer logout');
      //console.error('Erro ao fazer logout', error);
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
