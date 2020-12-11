import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy() {}

  async onLoginSuccess(result) {
    // this.loading.loadingOn();

    console.log('Firebase UI result: ', result);
  }
}
