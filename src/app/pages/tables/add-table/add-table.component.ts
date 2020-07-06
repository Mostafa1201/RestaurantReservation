import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AddTableService } from '../services/add-table.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {

  backendError
  tableId : number = -1;

  constructor(
    private addTableService : AddTableService,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private cdr : ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( async params => {
      this.tableId = parseInt(params.get("id"));
    });

  }

  async addTable(event){
    try {
      console.log("user_id: ",JSON.parse(localStorage.user).id);
      let requestObject = {
        ...event,
        user: JSON.parse(localStorage.user).id 
      }
      this.addTableService.setParams(requestObject);
      let res = await this.addTableService.makeRequest();
      this.router.navigate([''])
    } catch (error) {
      this.backendError = error.faultyRequest.error;  
      this.cdr.detectChanges()
    }
  }

}
