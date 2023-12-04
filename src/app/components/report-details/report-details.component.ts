import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/Report';
import { Status } from 'src/app/models/Status';
import { ReportService } from 'src/app/services/report.service';

@Component({
	selector: 'app-report-details',
	templateUrl: './report-details.component.html',
	styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent {
	
	url: string;
	report!: Report;

	constructor(private activeedRoute: ActivatedRoute, private http: HttpClient, private rs: ReportService) {
		this.url = `https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/${activeedRoute.snapshot.params["id"]}/`;

		this.http.get(this.url).subscribe((data) => {
			this.report = Report.parseReport(JSON.parse(data["data" as keyof object]));
		})
	}

	change() {
		var password = prompt("Password:");
		this.http.get("https://api.hashify.net/hash/md5/hex?value=" + password)
				.subscribe((data) => {
					if (data["Digest" as keyof object] == "fcab0453879a2b2281bc5073e3f5fe54") {
						this.rs.change(this.report);
						if (this.report.status == Status.OPEN) {
							this.report.status = Status.RESOLVED;
						}
						else {
							this.report.status = Status.OPEN;
						}
					}
					else {
						alert("Password Incorrect.");
					}
				});
	}
}
