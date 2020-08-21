import { Component, OnInit } from '@angular/core';
import { NGO_signup_data, Donor_signup_data } from '../dataformats';
import { AuthorizationService } from '../authorization.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthorizationService) { }

  ngOnInit(): void {
  }

  URL_MOD = "/signup";
  ngo = true;
  username_valid = true;
  passwd_valid = true;
  ngo_data: NGO_signup_data = {username: "",
    password: "",
    NGO_name: "",
    NGO_ID : "",
    NGO_Address : "",
    state : "",
    type : "",
    email : "",
    number : 0};

  donor_data: Donor_signup_data = {username: "",
    password: "",
    firstname : "",
    lastname : "",
    emailid: "",
    number: 0};

  post_response: any;

  signup(){
    if(this.ngo){
        let data = { "ngo": this.ngo_data};
        this.auth.UploadNGO(data).subscribe(
          (res) => this.post_response = res,
          (err) => console.log(err)
        );
          console.log("Data Submitted..");
          console.log(this.post_response);
    }
    else{
        let data = {"donor": this.donor_data};
        this.auth.UploadDonor(data).subscribe(
          (res) => this.post_response = res,
          (err) => console.log(err)
        );
          console.log("Data Submitted..");
          console.log(this.post_response);
    }

  }

  newColor1 = true;
  newColor2 = false;


  selectngo(){
    this.newColor1 = true;
    this.newColor2 = false;
    this.ngo = true;
  }

  selectdonor(){
    this.newColor2 = true;
    this.newColor1 = false;
    this.ngo = false;
  }

}





