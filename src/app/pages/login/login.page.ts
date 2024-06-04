import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {}

  async loginFirebase(){
    try{
      this.loading = true;
      await this.authService.loginAuthFirebase();
      this.router.navigate(['/tabs/tab4']);
    } catch(error: any) {
      console.error('Deu erro');
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
