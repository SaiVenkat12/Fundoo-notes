import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {
  @Output() createnoteRefreshEvent = new EventEmitter<Object>();

  viewCheckBoxs: boolean = false;

  Title = '';
  description = '';
  backgroundColor = '';
  createNote: boolean = true;
  show: boolean = true;
  pined: boolean = false;
  showClose: boolean = false;
  //inputs: any = [''];

  inputForm!: FormGroup;

  constructor(private noteservice: NotesService, private dataService: DataService,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createInputField()])
    });
    this.getCheckBox()
  }
   
  get inputs() {
    return this.inputForm.get('inputs') as FormArray;
  }

  createInputField(): FormControl {
    return this.formBuilder.control('');
  }

  addInput() {
    this.inputs.push(this.createInputField());
  }

  //addInput(): void {
    
    // if (event.key === "Enter"){
    //   this.inputs.push('')
    // }
    // this.showClose = !this.showClose
    // console.log(this.inputs);
  //}

  checkInput(){

  }

  getCheckBox() {
    this.dataService.currentCheckBox.subscribe((res: any) => {
      //this.viewCheckBoxs = res;
      console.log(res);

    })
  }
  
  onBackgroundColorChanged(color: string) {
    this.backgroundColor = color;
    console.log(this.backgroundColor);

  }


  showing() {
    this.show = false
  }

  pinNote() {
    this.pined = !this.pined;
  }

  closenote() {
    this.showClose = !this.showClose
    if (this.Title || this.description !== '') {

      let reqdata = {
        title: this.Title,
        description: this.description,
        color: this.backgroundColor,
        isPined: this.pined
      }
      console.log(reqdata);

      this.noteservice.createnote(reqdata).subscribe((result: any) => {
        console.log(result);
        this.createnoteRefreshEvent.emit(result.status.details);
      })

      this.Title = '';
      this.description = '';
      this.backgroundColor = '';
      this.show = true;

    }
    else {
      this.show = true;
      this.backgroundColor = '';
      console.log("no data");

    }
  }

}
