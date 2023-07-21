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

  private userInfo = new BehaviorSubject("");
  currentUser = this.userInfo.asObservable();

  private viewOption = new BehaviorSubject("");
  currentView = this.viewOption.asObservable();

  private labelData = new BehaviorSubject("");
  currentLabelMessage = this.labelData.asObservable();

  private showCheckboxs = new BehaviorSubject("");
  currentCheckBox = this.showCheckboxs.asObservable();

  private tokenData = new BehaviorSubject("");
  currentToken = this.tokenData.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  ChangeView(message: any){
    this.viewOption.next(message);
  }

  userId(message: any){
    this.userInfo.next(message);
  }

  sendLabelsData(message: any){
    this.labelData.next(message);
  }

  setTokenData(message: any){
    this.tokenData.next(message);
  }

  getCheckboxData(message: any){
    this.showCheckboxs.next(message);
  }

}