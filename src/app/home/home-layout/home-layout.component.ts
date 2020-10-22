import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
        <app-header></app-header> 
        <router-outlet></router-outlet>
  `,
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
