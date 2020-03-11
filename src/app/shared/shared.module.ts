import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainareaComponent } from './mainarea/mainarea.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, MainareaComponent, LoginComponent,
    FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports:[HeaderComponent,MainareaComponent,FooterComponent]
})
export class SharedModule { }
