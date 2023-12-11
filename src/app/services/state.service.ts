import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private curso = new BehaviorSubject<Course | null>(null)

  setCurso(curso: any) {
    this.curso.next(curso);
  }

  getCurso() {
    return this.curso.asObservable();
  }

  constructor() { }
}