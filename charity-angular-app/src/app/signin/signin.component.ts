import { Component, OnInit} from '@angular/core';
import { signin_data } from '../dataformats';
import { AuthorizationService } from '../authorization.service';


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
  
  signin()  {
    this.auth.AuthUser(this.data).subscribe(
      (res) => this.post_response = res,
      (err) => console.log(err)
    );
      console.log("Data Submitted..");
      console.log(this.data.password);
      console.log(this.post_response);
      /*
      if(typeof(this.post_response)=='object' && this.post_response)
        if('err' in this.post_response)
          if('100' == this.post_response.err)
            {this.email_valid = false;}
      */
  }


}


