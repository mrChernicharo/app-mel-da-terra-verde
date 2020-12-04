import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { auth as firebaseAuth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [firebaseAuth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/home',
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccess.bind(this),
      },
    };
    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

    const fireUiElementId = '#firebaseui-auth-container';
    this.ui.start(fireUiElementId, uiConfig);
  }
  ngOnDestroy() {
    this.ui.delete();
  }

  async onLoginSuccess(result) {
    // this.loading.loadingOn();

    console.log('Firebase UI result: ', result);

    this.router.navigateByUrl('/home');
  }
}
