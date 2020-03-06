import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>;

  constructor( private afAuth: AngularFireAuth, private router: Router ) { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      });
   }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
  get currentUserObservable(): any {
    return this.afAuth.authState
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.router.navigate(['/'])
      })
      .catch(error => console.log(error));
  }

  getCurrentLoggedIn() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }
    });
  }
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  
  //autoLogout(): void {
    //setTimeout
  //}

}
