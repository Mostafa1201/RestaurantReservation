import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormBase } from '../../../core/Forms/FormBase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent extends FormBase implements OnInit {
  tableForm : FormGroup;
  loading = false;
  tableForm$: Observable<boolean>;
  private unsubscribe: Subject<any>;
  @Output() onFormSubmit: EventEmitter<object> = new EventEmitter();
  @Input() title: string;
  @Input() data : object = {};

  constructor(
    private fb : FormBuilder,
  ) {
    super();
    this.unsubscribe = new Subject();
  }

  ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
  }
  
  ngOnInit() {
    this.initForm();
  }

  initForm() {
		this.form = this.fb.group({
      name: ['', [Validators.required]],
      noOfSeats: ['', [Validators.required]]
    });
  }

  get allIsFormsValid(){
    let isFormValid = true ;
    Object.keys(this.form.controls).forEach(key =>{
      if(this.form.get(key).value){
        isFormValid = false;
      }
    })
    return !this.isFormValid || isFormValid
  }

  sendFormData(){
    let data = this.form.value;
    this.onFormSubmit.emit(data);
  }

}
