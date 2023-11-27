import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        {
          provide: Firestore,
          useValue: {
            collection: () => ({
              doc: () => ({
                valueChanges: () => of({ foo: 'bar' }),
                set: () => Promise.resolve(),
              }),
            }),
          },
        },
      ],
    });
    service = TestBed.inject(DatabaseService);
    firestore = TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});