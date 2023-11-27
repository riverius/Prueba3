import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';


interface Course {
  id: string;
  nombre: string;
  asignatura: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  courses: Course[] = [];

  db: Firestore = inject(Firestore);

  async getCourses() {
    const coursesCollection = collection(this.db, 'cursos');
    const coursesSnapshot = await getDocs(coursesCollection);
    this.courses = coursesSnapshot.docs.map(doc => doc.data()) as Course[];
    return this.courses;
  }

  async setCourse(course: Course) {
    const coursesCollection = collection(this.db, 'cursos');
    const courseRef = await addDoc(coursesCollection, course);
    return courseRef;
  }
}