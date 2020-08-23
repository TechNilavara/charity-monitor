import { Component, OnInit} from '@angular/core';
import { signin_data } from '../dataformats';
import { AuthorizationService } from '../authorization.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  ngOnInit(): void {
  }
  constructor(private auth: AuthorizationService) { }

 
  
  data: signin_data = {username:"", password:""};

  submitted = false;
  username_valid = true;
  passwd_valid = true;
  post_response: any;
  
  signin(form: NgForm)  {
    this.auth.AuthUser(this.data).subscribe(
      (res) => {
        this.post_response = res;
        console.log(this.post_response.token);
        console.log(this.post_response.user)
      },
      (err) => console.log(err)
    );
      console.log("Data Submitted..");
      console.log(this.data.password);
      /*
      if(typeof(this.post_response)=='object' && this.post_response)
        if('err' in this.post_response)
          if('100' == this.post_response.err)
            {this.email_valid = false;}
      */
  }


}


