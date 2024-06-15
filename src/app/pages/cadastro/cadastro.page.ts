import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthFormData } from 'src/app/Types';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {}

  async registerLoginFirebase(formData: AuthFormData){
    await this.authService.createLogin(formData.email, formData.password);
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
