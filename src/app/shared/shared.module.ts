import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainareaComponent } from './mainarea/mainarea.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [HeaderComponent, MainareaComponent, LoginComponent],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent,MainareaComponent]
})
export class SharedModule { }
