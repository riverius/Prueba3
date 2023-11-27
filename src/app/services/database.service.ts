import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, onSnapshot, query, where, doc, Timestamp, docData, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { Course } from '../models/course';
import { Attendance } from '../models/attendance';
import { User } from '../models/user';
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

  async setAttendance(cursoId: string, userId: string) {
    const now = Timestamp.now();
    await addDoc(collection(this.db, 'asistencias'), { cursoId, userId, fecha: now });
  }

  getAttendance(cursoId: string): Observable<Attendance[]> {
    const attendanceCollection = collection(this.db, 'asistencias');
    const attendanceQuery = query(attendanceCollection, where('cursoId', '==', cursoId));
    return collectionData(attendanceQuery, { idField: 'id' }).pipe(
      map(asistencias => asistencias.map(asistencia => ({
        ...asistencia,
        fecha: (asistencia['fecha'] as Timestamp).toDate()
      }) as Attendance))
    );
  }

  getUser(userId: string): Observable<User> {
    const userDoc = doc(this.db, 'usuarios', userId);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }

  getUsersByCourseId(cursoId: string): Observable<{ user: User, asistencia: Attendance }[]> {
    return this.getAttendance(cursoId).pipe(
      switchMap(asistencias =>
        combineLatest(asistencias.map(asistencia =>
          this.getUser(asistencia.userId).pipe(
            map(user => ({ user, asistencia }))
          )
        ))
      )
    );
  }
}