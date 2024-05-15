import { Component, OnInit } from '@angular/core';
import { routesChildren } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {
  routesChildren = routesChildren;

  path = this.router.url;

  constructor(private router: Router, private route: ActivatedRoute){
    console.log(this.route)
    console.log(this.router);
    
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.path = this.router.url;
    })
  }

}
