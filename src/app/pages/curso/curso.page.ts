import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage {
  cursos: any[] = [
    {
      id: 1,
      nombre: 'Curso de Ionic',
      asignatura: 'Introducción a Ionic'
    },
    {
      id: 2,
      nombre: 'Curso de Ionic 2',
      asignatura: 'Introducción a Ionic 2'
    },
    {
      id: 3,
      nombre: 'Curso de Ionic 3',
      asignatura: 'Introducción a Ionic 3'
    },
    {
      id: 4,
      nombre: 'Curso de Ionic 4',
      asignatura: 'Introducción a Ionic 4'
    },
    {
      id: 5,
      nombre: 'Curso de Ionic 5',
      asignatura: 'Introducción a Ionic 5'
    },
  ];
  newQR!: string;

  constructor() {}

  async getQR(id : number) {
    this.newQR = id.toString();
  }
}