import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Router } from '@angular/router';
import { AuthFormData } from 'src/app/Types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService, private router: Router, private messagesService: MessagesService) { }

  ngOnInit() {}

  async loginFirebase(formData: AuthFormData){
    this.loading = true;
    await this.authService.signInLogin(formData.email, formData.password)
    this.loading = false;
  }

  async loginAuthGoogle(){
    this.loading = true;
  
    try {
      await this.authService.loginAuthGoogle();
    } finally {
      this.loading = false;
    }
  }
    
}
