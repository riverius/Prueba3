import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { StateService } from '../../services/state.service';
import { EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';
import { Attendance } from '../../models/attendance';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  newQR!: string;
  nombre!: string;
  asignatura!: string;
  usersAndAsistencias$: Observable<{ user: User, asistencia: Attendance }[]> = EMPTY;

  constructor(private stateService: StateService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.usersAndAsistencias$ = this.stateService.getCurso().pipe(
      tap(async curso => {
        if (curso) {
          this.newQR = await this.getQR(curso.id);
          this.nombre = curso.nombre;
          this.asignatura = curso.asignatura;
        }
      }),
      switchMap(curso => curso ? this.databaseService.getUsersByCourseId(curso.id) : of([]))
    );
  }

  async getQR(id: string): Promise<string> {
    return id.toString();
  }
}