import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, onSnapshot, query, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



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

  getCourses(): Observable<Course[]> {
    const coursesCollection = collection(this.db, 'cursos');
    return new Observable<Course[]>(observer => {
      const unsubscribe = onSnapshot(query(coursesCollection), snapshot => {
        this.courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
        observer.next(this.courses);
      });
      return unsubscribe;
    });
  }

  async addCourse(nombre: string, asignatura: string) {
    await addDoc(collection(this.db, 'cursos'), { nombre, asignatura });
  }

  async deleteCourse(id: string) {
    const docRef = doc(this.db, 'cursos', id);
    await deleteDoc(docRef);
  }
}