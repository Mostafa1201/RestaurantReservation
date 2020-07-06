import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormBase } from '../../../core/Forms/FormBase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent extends FormBase implements OnInit {
  @ViewChild('picker', {static: false}) picker: any;
  reservationForm : FormGroup;
  loading = false;
  reservationForm$: Observable<boolean>;
  private unsubscribe: Subject<any>;
  @Output() onFormSubmit: EventEmitter<object> = new EventEmitter();
  @Input() title: string;
  @Input() data : object = {};

  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color = 'primary';
  public touchUi = true;

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
      noOfSeats: ['', [Validators.required]],
      date : [new Date(), Validators.required]
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
