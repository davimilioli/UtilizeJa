import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { Storage } from '@ionic/storage-angular';
import { MessagesService } from '../messages/messages.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User | null = null;

  constructor(private angularFireAuth: AngularFireAuth,
    private storage: Storage,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.initializeAuthService();
  }

  async initializeAuthService() {
    await this.createStorage();

    try {
      await this.angularFireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.angularFireAuth.authState.subscribe(async (user) => {
        if (user) {
          await this.storage.set('user', JSON.stringify(user));
          this.currentUser = user;
        } else {
          await this.storage.remove('user');
          this.currentUser = null;
        }
      });

      await this.initializeUser();
    } catch (error) {
      this.messagesService.toast('Ocorreu algum erro, tente novamente mais tarde');
    }
  }

  get authState() {
    return this.angularFireAuth.authState;
  }

  async createLogin(email: string, password: string){
    try{
      await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      this.router.navigate(['/login']);
    } catch(error){
      this.messagesService.toast('Erro ao criar usuário');
    }
  }

  async signInLogin(email: string, password: string) {
    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/tabs/tab4']);
    } catch(error) {
      this.messagesService.toast('Email ou senha incorretos');
    }
  }

  async createStorage() {
    await this.storage.create(); 
  }

  async loginAuthGoogle(){
    try{
      const user = await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (user) {
        this.router.navigate(['/tabs/tab4']);
        this.messagesService.toast('Autenticado com sucesso');
      } else {
        this.messagesService.toast('Não foi possível autenticar');
      }

    } catch(error: any) {
      this.messagesService.toast('Não foi possível autenticar');
    }
  }

  async logoutAuth(){
    try{
      await this.angularFireAuth.signOut();
      await this.storage.remove('user');
      this.currentUser = null;
      this.router.navigate(['/login']);
    } catch(error){
      this.messagesService.toast('Erro ao fazer logout.');
    }
  }

  async initializeUser() {
    try {
      const storedUser = await this.storage.get('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
      return this.currentUser;
    } catch (error) {
      this.messagesService.toast('Erro ao inicializar usuário');
      return null;
    }
  }
}
