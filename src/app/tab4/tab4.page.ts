import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
  user: firebase.User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.initializeUser();
  } 

  async initializeUser() {
    this.user = await this.authService.initializeUser();
  } 

  async logout(){
    const authLogout: any = await this.authService.logoutAuth();
    
    if(authLogout){
      this.user = null;
    }
    
  }

}
