import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/app/app.component';
import { ReportListComponent } from '../components/report-list/report-list.component';
import { ReportService } from '../services/report.service';
import { ReportAddFormComponent } from '../components/report-add-form/report-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ReportDetailsComponent } from '../components/report-details/report-details.component';
import { MapComponent } from '../components/map/map.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		ReportListComponent,
		ReportAddFormComponent,
  		ReportDetailsComponent,
  		MapComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RoutingModule,
		HttpClientModule
	],
	providers: [ReportService],
	bootstrap: [AppComponent]
})
export class AppModule { }
