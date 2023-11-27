import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  
})
export class DashboardPage implements OnInit {
  constructor(private stateService:StateService, private router:Router ) { }

  ngOnInit() {
    this.stateService.username.subscribe((value) => {
      this.username = value;
    });
  }
}