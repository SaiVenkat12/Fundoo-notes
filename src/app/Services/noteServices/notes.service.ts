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

  deletenotesForever(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/deleteForeverNotes', reqdata, true, httpHeadersOption)
  }

  notebgColorChange(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('notes/changesColorNotes', reqdata, true, httpHeadersOption)
  }

  getNoteLabels() {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.getService('noteLabels/getNoteLabelList', true, httpHeadersOption)
  }

  createNoteLabels(reqdata: any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('noteLabels', reqdata, true, httpHeadersOption)
  }


  deleteNoteLabels(id:any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.deleteService("noteLabels/"+id+"/deleteNoteLabel",true, httpHeadersOption)
  }

  updateNoteLabels(reqdata: any,id:any) {
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.postService('noteLabels/'+id+'/updateNoteLabel', reqdata, true, httpHeadersOption)
  }

  addLabeltoNotes(notesId:any,LabelId:any){
    this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
  }
  return this.httpService.postService('notes/'+notesId+'/addLabelToNotes/'+LabelId+'/add','', true, httpHeadersOption)
}

removeLabelToNotes(notesId:any,LabelId:any){
  this.token = localStorage.getItem('token');
  let httpHeadersOption = {
    headers: new HttpHeaders({
      contentType: 'application/json',
      authorization: this.token,
    })
}
return this.httpService.postService('notes/'+notesId+'/addLabelToNotes/'+LabelId+'/remove','', true, httpHeadersOption)
}

AddReminder(reqdata: any) {
  this.token = localStorage.getItem('token');
  let httpHeadersOption = {
    headers: new HttpHeaders({
      contentType: 'application/json',
      authorization: this.token,
    })
  }
  return this.httpService.postService('notes/addUpdateReminderNotes', reqdata, true, httpHeadersOption)
}

getReminderNotes(){
  this.token = localStorage.getItem('token');
    let httpHeadersOption = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: this.token,
      })
    }
    return this.httpService.getService('notes/getReminderNotesList', true, httpHeadersOption)
}

removeReminder(reqdata: any) {
  this.token = localStorage.getItem('token');
  let httpHeadersOption = {
    headers: new HttpHeaders({
      contentType: 'application/json',
      authorization: this.token,
    })
  }
  return this.httpService.postService('notes/removeReminderNotes', reqdata, true, httpHeadersOption)
}

addCollabrator(reqdata: any,id:any) {
  this.token = localStorage.getItem('token');
  let httpHeadersOption = {
    headers: new HttpHeaders({
      contentType: 'application/json',
      authorization: this.token,
    })
  }
  return this.httpService.postService('notes/'+id+'/AddcollaboratorsNotes', reqdata, true, httpHeadersOption)
}

removeCollabrator(notesId:any,collabId:any){
  this.token = localStorage.getItem('token');
  let httpHeadersOption = {
    headers: new HttpHeaders({
      contentType: 'application/json',
      authorization: this.token,
    })
}
return this.httpService.deleteService('notes/'+notesId+'/removeCollaboratorsNotes/'+collabId, true, httpHeadersOption)
}

}



