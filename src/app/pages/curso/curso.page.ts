import { Component, OnInit} from '@angular/core';
import { DatabaseService } from '../../services/database.service';

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

  newQR!: string;
  cursos$: Course[] = [];

  constructor(private databaseService: DatabaseService) {  }

  ngOnInit() {
    this.databaseService.getCourses().then(cursos => {
      this.cursos$ = cursos;
    });
  }

  async getQR(id : string) {
    this.newQR = id.toString();
  }

}