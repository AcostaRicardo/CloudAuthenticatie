import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sign_email: string = '';
  sign_password: string = '';
  sign_error: string = '';
  
  log_email: string = '';
  log_password: string = '';
  log_error: string = '';

  constructor(
    public fireauth: AngularFireAuth,
    private router: Router,
  ) { }

  signup() {
    this.fireauth.auth.createUserWithEmailAndPassword(this.sign_email, this.sign_password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          res.user.sendEmailVerification();
          this.router.navigate(['/login']);
        }
      })
      .catch(err => {
        console.log(`signup failed ${err}`);
        this.sign_error = err.message;
      });
  }

  login() {
    this.fireauth.auth.signInWithEmailAndPassword(this.log_email, this.log_password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.log_error = err.message;
      });
  }

  CurrentUserLoggedIin() {
    var user = this.fireauth.auth.currentUser;
    if (user) {
      console.log("user is logged in: ",user.email);
    } else {
      console.log("user is not logged in!");
    }
  }
}
