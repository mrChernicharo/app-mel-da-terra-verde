import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
// var admin = require('firebase-admin');

// import {serviceAccount} from 'mel-da-terra-verde-app-firebase-adminsdk-uc2at-d9b3b2e101.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Mel da Terra Verde';

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(
          'appComponent -> authState.subscribe(user => authService.createUser(user))'
        );
        console.log('user.uid -> ' + user.uid);
        this.authService.createUser(user);
      }
    });
  }
}
