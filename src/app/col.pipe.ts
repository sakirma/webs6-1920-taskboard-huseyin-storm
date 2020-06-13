import {Pipe, PipeTransform} from '@angular/core';
import {FirestoreService} from './services/firestore.service';
import {Observable} from 'rxjs';

@Pipe({
  name: 'col'
})
export class ColPipe implements PipeTransform {
  constructor(private db: FirestoreService) {
  }

  transform(value: any, ...args): Observable<any> {
    return this.db.col$(value.path);
  }
}
