import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddReservationService } from '../services/add-reservation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  backendError
  tableId : number = -1;

  constructor(
    private addReservationService : AddReservationService,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private cdr : ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( async params => {
      this.tableId = parseInt(params.get("id"));
    });

  }

  async addReservation(event){
    try {
      console.log("user_id: ",JSON.parse(localStorage.user).id);
      let date:any = moment(new Date(event.date));
      date = date.format('YYYY-MM-DD HH:mm:ss');
      console.log("date: ",date);
      
      let requestObject = {
        noOfSeats: event.noOfSeats,
        date,
        table: this.tableId,
        user: JSON.parse(localStorage.user).id 
      }
      this.addReservationService.setParams(requestObject);
      let res = await this.addReservationService.makeRequest();
      this.router.navigate([''])
    } catch (error) {
      this.backendError = error.faultyRequest.error;  
      this.cdr.detectChanges()
    }
  }

}
