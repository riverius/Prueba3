import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, getDocs, onSnapshot, query, where, doc, Timestamp, docData, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { Course } from '../models/course';
import { Attendance } from '../models/attendance';
import { ExtendedUser } from '../models/user';
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

  async setAttendance(cursoId: string, userId: string): Promise<string> {
    const attendanceCollection = collection(this.db, 'asistencias');
    const attendanceQuery = query(attendanceCollection, where('cursoId', '==', cursoId), where('userId', '==', userId));
    const userAttendance = await getDocs(attendanceQuery);
    if (!userAttendance.empty) {
      return 'Su asistencia ya fue registrada correctamente';
    } else {
      const now = Timestamp.now();
      await addDoc(collection(this.db, 'asistencias'), { cursoId, userId, fecha: now });
      return 'Asistencia registrada correctamente';
    }
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

  getUser(userId: string): Observable<ExtendedUser> {
    const userDoc = doc(this.db, 'usuarios', userId);
    return docData(userDoc, { idField: 'id' as keyof ExtendedUser }) as Observable<ExtendedUser>;
  }

  getUsersByCourseId(cursoId: string): Observable<{ user: ExtendedUser, asistencia: Attendance }[]> {
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