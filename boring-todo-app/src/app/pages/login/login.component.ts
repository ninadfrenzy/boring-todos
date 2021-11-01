import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    
  }
  login():void {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
      this.storeUserData();
      this.router.navigateByUrl('todos')
      
    })
  }
  storeUserData() {

  }
}
