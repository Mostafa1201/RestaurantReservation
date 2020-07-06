import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AvailableTablesListService } from '../services/get-available-tables.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CloseReservationService } from '../services/close-reservation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent implements OnInit {
  @ViewChild('picker', {static: false}) picker: any;
  constructor(
    private availableTablesListService: AvailableTablesListService,
    private closeReservationService: CloseReservationService,
    private router : Router,
    private cdr: ChangeDetectorRef,
  ) { }
  totalItems: number;
	properties = ["name","noOfSeats","isAvailable"];
  requestObject = {
    date :  new Date() ,
    noOfSeats: 1,
		size : 5,
		page : 1,
    columns : this.properties,
    userType: ""
  };
  restaurantTables: any;
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
    await this.updateTablesList();
  }

  async updateTablesList(search = false){
    if(search){
      this.requestObject.page = 0;
    }
    else{
      this.requestObject.page--; // since backend pagination is 0 based , we have to decrement value here by 1
    }
    this.requestObject.noOfSeats = Number(this.requestObject.noOfSeats)
    this.availableTablesListService.setParams({
      ...this.requestObject
    });
    let responseData = await this.availableTablesListService.makeRequest();
    console.log("responseData: ",responseData);
    
    this.totalItems = responseData.totalItems;
    this.restaurantTables = responseData.data;
    
    this.cdr.detectChanges()
  }

  onPageChanged(pageChange : any){
    this.requestObject.page = pageChange.page;
    this.requestObject.size = pageChange.itemsPerPage;    
    this.updateTablesList();
  }

  async filterTablesList(){
    //@ts-ignore
    this.requestObject.date = moment(this.dateControl.value).format('YYYY-MM-DD');
    await this.updateTablesList(true);
  }

  async searchTables(searchQuery){
    await this.updateTablesList(true)
  }

  // async closeReservation(tableId){
  //   this.closeReservationService.setParams(tableId);
  //   let result = await this.closeReservationService.makeRequest();
  //   if(result){
  //     this.router.navigate([''])
  //   }
  // }
}
