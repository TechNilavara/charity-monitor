import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { main_data } from './dataformats';



@Injectable({
  providedIn: 'root'
})
export class NgoDataService {

  constructor(private httpclient: HttpClient) { }
  
  data : main_data[];
  NGO_name: string[];

  baseurl = 'https://localhost:8000/home';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  Getdata(): Observable<main_data[]> {
    console.log("Starting data reception..")
    return this.httpclient.get<main_data[]>(this.baseurl);
  }  
  
}