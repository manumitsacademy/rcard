import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthenticationService,public router:Router) { }

  ngOnInit() {
    this.authService.loggedOut();
  }
  gotoDashboard(){
    this.router.navigate(["/dashboard"]);    
  }
  ngOnDestroy(){
    this.authService.loggedOut();
  }
}
