import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { main_data } from './dataformats';
import { NgoDataService } from './ngo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'charity-angular-app';
  constructor(private httpClient: HttpClient){}
  data : main_data[];
  NGO_name: string[];
  data_service: NgoDataService;


  ngOnInit(): void {
    console.log("initialising .....")
    this.data_service.Getdata().subscribe((data)=> this.data= data);
    if(this.data.length != 0){
      for(var i=0; i< this.data.length; i++)
    {
      this.NGO_name.push(this.data[i].NGO_name);
    }
    }
  }
}
