import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logInStatus=false;
  constructor(public authService:AuthenticationService) {
    this.authService.loggedInEvent.subscribe((logInStatus)=>{
      this.logInStatus=logInStatus;
    })
   }

  ngOnInit() {
  }

}
