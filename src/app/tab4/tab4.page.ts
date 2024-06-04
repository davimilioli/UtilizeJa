import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';


interface HistoricItem {
  day: string;
  progress: number;
  animated?: boolean;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
  user: firebase.User | null = null;

  constructor(private authService: AuthService, private router: Router) {}


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
      console.error('Erro ao inicializar usuário', error);
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
      console.error('Erro ao fazer logout', error);
    }
  }
  

}
