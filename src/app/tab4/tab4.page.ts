import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  user: firebase.User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.initializeUser();
      }
    });
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
