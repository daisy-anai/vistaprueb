import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Concesion } from '../models/concesion';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  setConcesion(concesion: Concesion){
    this.concesion = concesion;
    this.subject.next({ concesion: concesion });
  }

  getConcesion(): Observable<any> {
    return this.subject.asObservable();
  }

  clearMessages() {
    this.subject.next();
  }
}
