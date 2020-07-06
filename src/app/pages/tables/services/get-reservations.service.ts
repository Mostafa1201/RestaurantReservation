import { Injectable } from '@angular/core';
import { BaseLoggedInPostRequest } from 'src/app/core/backend-services/base-logged-in-post-request.service';
import URL from "src/app/core/constants/urls";
@Injectable({
  providedIn: 'root'
})
export class ReservationsListService extends BaseLoggedInPostRequest{
  _path = URL.reservation.list;
}
