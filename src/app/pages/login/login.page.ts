import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData: Observable<firebase.User | null>;

  constructor(public auth: AngularFireAuth) { 

    this.userData = this.auth.authState;

    this.userData.subscribe((user) => {
      console.log(user)
    })
  }

  ngOnInit() {
  }

  authLoginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  authLogoutGoogle(){
    this.auth.signOut();
  }
}
