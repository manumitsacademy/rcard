import { Injectable,EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  loggedInEvent = new EventEmitter();
  loggedIn(){
    this.loggedInEvent.emit(true);
  }
  loggedOut(){
    this.loggedInEvent.emit(false);
  }
}
