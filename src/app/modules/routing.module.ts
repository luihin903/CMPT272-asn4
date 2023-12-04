import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from '../components/report-list/report-list.component';
import { ReportAddFormComponent } from '../components/report-add-form/report-add-form.component';
import { ReportDetailsComponent } from '../components/report-details/report-details.component';

const appRoutes: Routes = [
	{ path: "", component: ReportListComponent },
	{ path: "add", component: ReportAddFormComponent },
	{ path: "report/:id", component: ReportDetailsComponent }
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})
export class RoutingModule { }
