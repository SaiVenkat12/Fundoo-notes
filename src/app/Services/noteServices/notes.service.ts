import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  token: any
  constructor(private httpService: HttpService) { }

  createnote(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/addNotes', reqdata, true, httpHeadersOption)
  }

  getallnotes() {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.getService('notes/getNotesList', true, httpHeadersOption)
  }

  updatenotes(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/updateNotes', reqdata, true, httpHeadersOption)
  }

  deletenote(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/trashNotes', reqdata, true, httpHeadersOption)
  }

  archive(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/archiveNotes', reqdata, true, httpHeadersOption)
  }

  getArchivenotes() {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.getService('notes/getArchiveNotesList', true, httpHeadersOption)
  }

  getTrashnotes() {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.getService('notes/getTrashNotesList', true, httpHeadersOption)
  }

  deletenotesForever(reqdata: any){
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/deleteForeverNotes', reqdata, true, httpHeadersOption)
  }

}

