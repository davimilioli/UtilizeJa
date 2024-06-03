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

  async createStorage() {
    await this.storage.create(); 
  }

  loginAuthFirebase(){
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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
