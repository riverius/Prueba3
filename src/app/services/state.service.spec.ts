import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('StateService', () => {
  let service: StateService;
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
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
    service = TestBed.inject(StateService);
    firestore = TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});