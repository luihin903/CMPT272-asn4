import { Injectable } from '@angular/core';
import { Report } from '../models/Report';
import { Location } from '../models/Location';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/Status';

@Injectable({
  	providedIn: 'root'
})
export class ReportService {
	reports: Report[];
	amount!: number;
	length: number;

  	constructor(private http: HttpClient) {
		this.reports = [];
		this.amount = 100;
		this.length = 0;
		this.http.get("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/amount/")
				.subscribe((data: object) => {
					this.amount = data["data" as keyof object];
				});

		this.http.get("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/")
				.subscribe((data) => {
					for (let r of (data as string[])) {
						r = r["data" as keyof object];
						r = JSON.parse(r);
						
						var newReport: Report = new Report(
							r["id" as keyof object],
							r["name" as keyof object],
							r["phone" as keyof object],
							r["villain" as keyof object],
							new Location(r["location" as keyof object]["name" as keyof object], Number(r["location" as keyof object]["latitude" as keyof object]), Number(r["location" as keyof object]["longitude" as keyof object])),
							r["picture" as keyof object],
							r["info" as keyof object],
							r["time" as keyof object],
							r["date" as keyof object],
							r["status" as keyof object]
						)
						this.reports.push(newReport);
						this.length ++;
					}
					this.reports.pop();
					this.length --;
				})
  	}

	add(newReport: object) {
		var r: Report = new Report(
			++ this.amount,
			newReport["name" as keyof object],
			newReport["phone" as keyof object],
			newReport["villain" as keyof object],
			new Location(newReport["location" as keyof object], newReport["latitude" as keyof object], newReport["longitude" as keyof object]),
			newReport["picture" as keyof object],
			newReport["info" as keyof object]
		);
		this.reports.push(r);
		this.length ++;

		this.http.put("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/amount/", {
			"key": "amount",
			"data": this.amount
		}).subscribe((data: object) => {});
		
		this.http.post("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/", {
			"key": this.amount,
			"data": JSON.stringify(r)
		}).subscribe((data: object) => {});
	}

	get(): Report[] {
		return this.reports;
	}

	change(report: Report) {
		for (var i in this.reports) {
			if (this.reports[i].id == report.id) {
				var r: Report = this.reports[i];
				if (r.status == Status.OPEN) {
					r.status = Status.RESOLVED;
				}
				else {
					r.status = Status.OPEN;
				}
				
				this.http.put("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/" + r.id + "/", {
					"key": r.id,
					"data": JSON.stringify(r)
				}).subscribe((data) => {});
				this.reports[i] = r;
			}
		}
	}

	delete(report: Report) {
		for (var i in this.reports) {
			if (this.reports[i].id == report.id) {
				this.http.delete("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/" + report.id + "/").subscribe((data) => {});
				this.reports.splice(Number(i), 1);
			}
		}
	}
}
