import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreComponent } from './core/core.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth/auth.service';
import { PopoverModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    PopoverModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
