import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Report';
import * as L from 'leaflet';
import { ReportService } from 'src/app/services/report.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	reports: Report[];
	map!: L.Map;

	constructor(private rs: ReportService, private http: HttpClient) {
		this.reports = rs.get();
	}

	ngOnInit(): void {
		this.map = new L.Map("mapid").setView([49.27, -123], 11);
		const tiles = new L.TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: "Map data &copy; <a href = 'https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
		}).addTo(this.map);

		this.http.get("https://272.selfip.net/apps/CROarsxMh4/collections/reports/documents/")
				.subscribe((data) => {
					for (var i of data as string[]) {
						var r: Report = Report.parseReport(JSON.parse(i["data" as keyof object]));
						var m = L.marker([r.location.latitude, r.location.longitude]).addTo(this.map);
						m.bindPopup(r.location.name).openPopup();
					}
				})
	}
}
