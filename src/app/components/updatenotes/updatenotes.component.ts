import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';
@Component({
  selector: 'app-updatenotes',
  templateUrl: './updatenotes.component.html',
  styleUrls: ['./updatenotes.component.scss']
})

export class UpdatenotesComponent {
  title: string;
  description: string;
  color: any;
  inputForm!: FormGroup;
  viewCheckBoxs: boolean = false;
  showClose: any;
  data2: any = []
  newCheckbox: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdatenotesComponent>, private noteservice: NotesService, private dataService: DataService, private formBuilder: FormBuilder) {
    this.title = data.title;
    this.description = data.description;
    this.color = data.color;
  }

  ngOnInit() {
    this.getCheckBox()
    this.data2 = this.data.noteCheckLists
    this.inputForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createInputField()])
    });
    console.log(this.data.noteCheckLists);

  }

  onBackgroundColorChanged(bgcolor: string) {
    this.color = bgcolor;

  }

  getCheckBox() {
    this.dataService.currentCheckBox.subscribe((res: any) => {
      this.viewCheckBoxs = res;
      console.log(res);

    })
  }

  get inputs() {
    return this.inputForm.get('inputs') as FormArray;
  }

  createInputField(): FormControl {
    return this.formBuilder.control('');
  }

  addInput() {
    // this.inputs.push(this.createInputField());
    // console.log("input check",this.inputs.value);

    //this.noteservice.addChecklists(this.formBuilder.control.val)
    //console.log(this.newCheckbox,this.data.id);

    // this.data.noteCheckLists.push(this.newCheckbox)
    // console.log(this.data.noteCheckLists);

    let reqData = {
      noteId: this.data.id,
      itemName: this.newCheckbox
    }
    console.log(reqData);

    this.noteservice.addChecklists(reqData, this.data.id).subscribe((res: any) => {
      console.log(res,res.data.details);
      this.data2.push(res.data.details)
      this.newCheckbox='';
      
    })

  }
  remove(checklistData: any): void {
    console.log("remove check");

    let reqData = {
      noteId: checklistData.notesId,
      checklistId: checklistData.id,
    }
    console.log(reqData);

    this.noteservice.removeChecklists(reqData, this.data.id).subscribe((res: any) => {
      let i=this.data2.indexOf(checklistData);
      this.data2.splice(i,1)
      console.log("removed", res);
    })
  }

  updateChecklist(checklistData: any){
    let reqData = {
      itemName:checklistData.itemName,
      noteId : this.data.id,
      checklistId: checklistData.id,
    }
    
    this.noteservice.updateChecklists(reqData, this.data.id).subscribe((res: any) => {
      console.log(res);
      
    })
  }

  close() {
    let reqdata = {
      noteId: this.data.id,
      title: this.title,
      description: this.description,
      color: this.color,
    }
    this.noteservice.updatenotes(reqdata).subscribe((result: any) => {
      console.log(reqdata.color);

      console.log("update: ", result);
      console.log(result.data);

      this.dialogRef.close();
    })

  }

}
