import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageId = new BehaviorSubject("");
  currentIdMessage = this.messageId.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  userId(message: any){
    this.messageId.next(message)
  }

}