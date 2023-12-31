import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { StateService } from '../../services/state.service';
import { EMPTY, Observable, of } from 'rxjs';
import { ExtendedUser } from '../../models/user';
import { Attendance } from '../../models/attendance';
import { switchMap, tap, map } from 'rxjs/operators'; // Importa el operador map

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  newQR!: string;
  nombre!: string;
  asignatura!: string;
  usersAndAsistencias$: Observable<{ user: ExtendedUser, asistencia: Attendance }[]> = EMPTY;

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
      switchMap(curso => curso ? this.databaseService.getUsersByCourseId(curso.id).pipe(
        map((users: { user: ExtendedUser, asistencia: Attendance }[]) => users.map(userAsistencia => ({
          user: userAsistencia.user,
          asistencia: { ...userAsistencia.asistencia, fecha: userAsistencia.asistencia.fecha || new Date() }
        })))
      ) : of([]))
    );
  }

  async getQR(id: string): Promise<string> {
    return id.toString();
  }
}