import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgoDataService } from './ngo-data.service';
import {MatButtonModule} from  '@angular/material/button';
import {MatCheckboxModule} from  '@angular/material/checkbox';
import {MatCardModule} from  '@angular/material/card';
import {MatInputModule} from  '@angular/material/input';
import {MatRadioModule} from  '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthorizationService } from './authorization.service';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
     MatCardModule,
     MatInputModule,
     MatRadioModule,
     MatSlideToggleModule
  ],
  providers: [NgoDataService, AuthorizationService],
  bootstrap: [AppComponent]
})


export class AppModule {

}
