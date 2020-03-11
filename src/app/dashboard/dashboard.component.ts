import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public authService:AuthenticationService) { }

  ngOnInit() {    
    this.authService.loggedIn();
  }
  ngOnDestroy(){
    this.authService.loggedOut();
  }
}
