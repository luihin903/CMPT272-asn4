import { Component } from '@angular/core';
import { Report } from '../../models/Report';
import { ReportService } from 'src/app/services/report.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
	reports: Report[];

	byLocation: number;
	byVillain: number;
	byTime: number;
	byStatus: number;

	constructor(private rs: ReportService, private http: HttpClient) {
		this.reports = rs.get();
		this.byLocation = 0;
		this.byVillain = 0;
		this.byTime = 0;
		this.byStatus = 0;
	}

	delete(r: Report) {
		var password = prompt("Password:");
		this.http.get("https://api.hashify.net/hash/md5/hex?value=" + password)
				.subscribe((data) => {
					if (data["Digest" as keyof object] == "fcab0453879a2b2281bc5073e3f5fe54") {
						this.rs.delete(r);
						this.reports = this.rs.get();
					}
					else {
						alert("Password Incorrect.");
					}
				});
	}

	sortByLocation() {
		var newReports: Report[] = [];
		for (var r of this.reports) {
			if (newReports.length == 0) {
				newReports.push(r);
			}
			else if (r.location.name > newReports[newReports.length-1].location.name) {
				newReports.push(r);
			}
			else {
				for (var i = 0; i < newReports.length; i ++) {
					if (r.location.name < newReports[i].location.name) {
						newReports.splice(i, 0, r);
						break;
					}
				}
			}
		}
		this.reports = newReports;

		if (this.byLocation == 1) {
			this.reports.reverse();
			this.byLocation *= -1;
		}
		else {
			this.byLocation = 1;
		}

		this.byVillain = 0;
		this.byTime = 0;
		this.byStatus = 0;
	}

	sortByVillain() {
		var newReports: Report[] = [];
		for (var r of this.reports) {
			if (newReports.length == 0) {
				newReports.push(r);
			}
			else if (r.villain > newReports[newReports.length-1].villain) {
				newReports.push(r);
			}
			else {
				for (var i = 0; i < newReports.length; i ++) {
					if (r.villain < newReports[i].villain) {
						newReports.splice(i, 0, r);
						break;
					}
				}
			}
		}
		this.reports = newReports;
		
		if (this.byVillain == 1) {
			this.reports.reverse();
			this.byVillain *= -1;
		}
		else {
			this.byVillain = 1;
		}

		this.byLocation = 0;
		this.byTime = 0;
		this.byStatus = 0;
	}

	sortByTime() {
		var newReports: Report[] = [];
		for (var r of this.reports) {
			if (newReports.length == 0) {
				newReports.push(r);
			}
			else if (r.time > newReports[newReports.length-1].time) {
				newReports.push(r);
			}
			else {
				for (var i = 0; i < newReports.length; i ++) {
					if (r.time < newReports[i].time) {
						newReports.splice(i, 0, r);
						break;
					}
				}
			}
		}
		this.reports = newReports;

		if (this.byTime == 1) {
			this.reports.reverse();
			this.byTime *= -1;
		}
		else {
			this.byTime = 1;
		}

		this.byLocation = 0;
		this.byVillain = 0;
		this.byStatus = 0;
	}

	sortByStatus() {
		var newReports: Report[] = [];
		for (var r of this.reports) {
			if (newReports.length == 0) {
				newReports.push(r);
			}
			else if (r.status >= newReports[newReports.length-1].status) {
				newReports.push(r);
			}
			else {
				for (var i = 0; i < newReports.length; i ++) {
					if (r.status < newReports[i].status) {
						newReports.splice(i, 0, r);
						break;
					}
				}
			}
		}
		this.reports = newReports;

		if (this.byStatus == 1) {
			this.reports.reverse();
			this.byStatus *= -1;
		}
		else {
			this.byStatus = 1;
		}

		this.byLocation = 0;
		this.byVillain = 0;
		this.byTime = 0;
	}

}
