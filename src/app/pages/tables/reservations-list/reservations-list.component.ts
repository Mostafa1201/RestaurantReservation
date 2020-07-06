import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CloseReservationService } from '../services/close-reservation.service';
import { Router } from '@angular/router';
import { ReservationsListService } from '../services/get-reservations.service';
@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {
  @ViewChild('picker', {static: false}) picker: any;
  constructor(
    private reservationsListService: ReservationsListService,
    private closeReservationService: CloseReservationService,
    private router : Router,
    private cdr: ChangeDetectorRef,
  ) { }
  totalItems: number;
	properties = ["name","noOfSeats","table","date"];
  requestObject = {
    date :  new Date() ,
    noOfSeats: 1,
		size : 5,
		page : 1,
    columns : this.properties,
    userType: ""
  };
  reservations: any;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color = 'primary';
  public touchUi = true;
  public dateControl = new FormControl(new Date());
  user;
  async ngOnInit() {
    this.user = JSON.parse(localStorage.user);
    this.requestObject.userType = this.user.type;
    await this.updateReservationsList();
  }

  async updateReservationsList(search = false){
    if(search){
      this.requestObject.page = 0;
    }
    else{
      this.requestObject.page--; // since backend pagination is 0 based , we have to decrement value here by 1
    }
    this.requestObject.noOfSeats = Number(this.requestObject.noOfSeats)
    this.reservationsListService.setParams({
      ...this.requestObject
    });
    let responseData = await this.reservationsListService.makeRequest();
    console.log("responseData: ",responseData);
    
    this.totalItems = responseData.totalItems;
    this.reservations = responseData.data;
    
    this.cdr.detectChanges()
  }

  onPageChanged(pageChange : any){
    this.requestObject.page = pageChange.page;
    this.requestObject.size = pageChange.itemsPerPage;    
    this.updateReservationsList();
  }

  async filterReservationsList(){
    //@ts-ignore
    this.requestObject.date = moment(this.dateControl.value).format('YYYY-MM-DD');
    await this.updateReservationsList(true);
  }

  async searchTables(searchQuery){
    await this.updateReservationsList(true)
  }

  async closeReservation(tableId){
    this.closeReservationService.setParams(tableId);
    let result = await this.closeReservationService.makeRequest();
    if(result){
      this.router.navigate([''])
    }
  }
}
