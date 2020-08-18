import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGO_signup_data, Donor_signup_data, signin_data } from './dataformats';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private httpclient: HttpClient) { }
  
  baseurl = 'https://localhost:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  UploadNGO(data): Observable<NGO_signup_data> {
    return this.httpclient.post<NGO_signup_data>(this.baseurl+'/signup', data, this.httpOptions)
  } 
  
  UploadDonor(data): Observable<Donor_signup_data> {
    return this.httpclient.post<Donor_signup_data>(this.baseurl + '/signup', data, this.httpOptions)
  }

  AuthUser(data): Observable<signin_data> {
    return this.httpclient.post<signin_data>(this.baseurl + '/signin', data, this.httpOptions)
  }
}