import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-c',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './c.component.html',
  styleUrl: './c.component.scss'
})
export class CComponent implements OnInit {

  emitData = new EventEmitter<any>;

  constructor(private fb: FormBuilder) {

  }


  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {


    this.formGroup = this.fb.group({
      data: [undefined, Validators.compose([])]
    })
  }

  onSubmit() {
   const form = this.formGroup.value;
   this.emitData.emit(form);
  }
}
