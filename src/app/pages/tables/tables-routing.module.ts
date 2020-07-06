import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TablesListComponent } from './tables-list/tables-list.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { AddTableComponent } from './add-table/add-table.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
const routes: Routes = [
	{
		path: "",
		component: TablesListComponent
	},
	{
		path: "reservations",
		children: [
			{
				path: "",
				component: ReservationsListComponent
			},
			{
				path: ":id/add",
				component: AddReservationComponent
			},
		]
	},
	{
		path: "tables",
		children: [
			{
				path: "add",
				component: AddTableComponent
			},
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TablesRoutingModule {}
