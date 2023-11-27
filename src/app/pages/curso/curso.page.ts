import { Component, OnInit} from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';

interface Course {
  id: string;
  nombre: string;
  asignatura: string;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit{

  cursos$: Course[] = [];

  constructor(private databaseService: DatabaseService, private stateService: StateService, private router: Router ) {  }

  ngOnInit() {
    this.databaseService.getCourses().subscribe(cursos => {
      this.cursos$ = cursos;
    });
  }

  setCurso(curso: Course) {
    this.stateService.setCurso(curso);
    this.router.navigate(['/attendance']);
  }

}