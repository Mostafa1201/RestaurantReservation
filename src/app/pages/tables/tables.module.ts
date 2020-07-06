import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TablesRoutingModule } from './tables-routing.module';
import { MaterialModule } from '../../core/material/material.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// Material
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
} from "@angular/material";
import { environment } from 'src/environments/environment';
import { TablesListComponent } from './tables-list/tables-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule,NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { TableFormComponent } from './table-form/table-form.component';
import { AddTableComponent } from './add-table/add-table.component';

@NgModule({
	declarations: [TablesListComponent, ReservationFormComponent, AddReservationComponent, TableFormComponent, AddTableComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		TablesRoutingModule,
		MaterialModule,
		NgxMatTimepickerModule,
		FormsModule,
		PaginationModule.forRoot(),
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		NgxMatDatetimePickerModule,
		NgxMatNativeDateModule,
	]
})
export class TablesModule {}
