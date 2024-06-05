import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User | null = null;

  constructor(private angularFireAuth: AngularFireAuth, private storage: Storage) {
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
      console.error(error);
    }
  }

  async createSign(email: string, password: string){
    try{
      await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      console.log('Registrou')
      return true;
    } catch(error){
      console.error('Erro ao criar usuário')
      return false;
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      console.log('Logou');
      return true;
    } catch(error) {
      console.log('Erro ao fazer login');
      return false;
    }
  }

  async createStorage() {
    await this.storage.create(); 
  }

  async loginAuthFirebase(){
    try{
      await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return true;
    } catch(error){
      return false;
    }
  }

  async logoutAuthFirebase(){
    await this.angularFireAuth.signOut();
    await this.storage.remove('user');
    this.currentUser = null;
  }

  async initializeUser() {
    try {
      const storedUser = await this.storage.get('user');

      if (storedUser) {
        return this.currentUser = JSON.parse(storedUser)
      }
    } catch (error) {
      console.error(error);
    }
  }

}
