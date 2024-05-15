import { Component, OnInit } from '@angular/core';
import { HttpService } from '../config/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{
  constructor(private httpService: HttpService){}

  ngOnInit(){
    // this.httpService.Login('admin','admin').subscribe(value => {
    //   console.log(value)
    // })
  }
}
