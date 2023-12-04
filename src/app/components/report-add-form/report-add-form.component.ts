import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import * as leaflet from "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
import * as L from 'leaflet';
import { ReportService } from 'src/app/services/report.service';

@Component({
	selector: 'app-report-add-form',
	templateUrl: './report-add-form.component.html',
	styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent implements OnInit {

	form: FormGroup;
	map!: L.Map;
	popup!: L.Popup;

	latElement!: HTMLInputElement;
	lngElement!: HTMLInputElement;
	locElement!: HTMLInputElement;

	constructor(private rs: ReportService, private router: Router) {
		let formControls = {
			name: new FormControl('', [Validators.required]),
			phone: new FormControl('', [Validators.required]),
			villain: new FormControl('', [Validators.required]),
			location: new FormControl('', [Validators.required]),
			latitude: new FormControl('', [Validators.required]),
			longitude: new FormControl('', [Validators.required]),
			picture: new FormControl(),
			info: new FormControl('', [Validators.required])
		}
		this.form = new FormGroup(formControls);
	}

	onSubmit(newReport: object) {
		this.rs.add(newReport);
		this.router.navigate([""]);
	}

	ngOnInit(): void {

		this.latElement = document.querySelector("[formControlName = 'latitude']")!;
		this.lngElement = document.querySelector("[formControlName = 'longitude']")!;
		this.locElement = document.querySelector("[formControlName = 'location']")!;

		this.showMap();
		this.popup = L.popup();
		this.map.on('click', (e: any) => {
			this.popup
				.setLatLng(e.latlng)
				.setContent(`${this.form.controls["location"].value ? this.form.controls["location"].value : "Unknown Location"}<br>(${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`)
				.openOn(this.map);

			this.form.controls["latitude"].setValue(e.latlng.lat);
			this.form.controls["longitude"].setValue(e.latlng.lng);
		});

		for (var element of [this.latElement, this.lngElement, this.locElement]) {
			element.addEventListener("input", (e) => {
				if (this.latElement.value != "" && this.lngElement.value != "") {
					this.popup
						.setLatLng(new L.LatLng(Number(this.latElement.value), Number(this.lngElement.value)))
						.setContent(`${this.locElement.value ? this.locElement.value : "Unknown Location"}<br>(${Number(this.latElement.value).toFixed(4)}, ${Number(this.lngElement.value).toFixed(4)})`)
						.openOn(this.map);
				}
			});
		}
	}

	showMap() {
		this.map = L.map("mapid").setView([49.27, -123], 11);

		const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: "Map data &copy; <a href = 'https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
		}).addTo(this.map);
	}
}
