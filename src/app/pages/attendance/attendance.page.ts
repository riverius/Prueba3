import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  newQR!: string;
  nombre!: string;
  asignatura!: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getCurso().subscribe(curso => {
      if (curso) {
        this.getQR(curso.id);
        this.nombre = curso.nombre;
        this.asignatura = curso.asignatura;
      }
    });
  }

  async getQR(id : string) {
    this.newQR = id.toString();
  }
}