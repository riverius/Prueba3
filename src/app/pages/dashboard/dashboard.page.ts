import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  title: string = 'Panel de Alumno';
  username:string = '';
  photoService: any;

  constructor(private stateService:StateService, private router:Router, public photoservice:PhotoService ) { }

  ngOnInit() {
    this.stateService.username.subscribe((value) => {
      this.username = value;
    });
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}