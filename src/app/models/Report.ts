import { Location } from "./Location";
import { Status } from "./Status";

export class Report {
    id: number;
    name: string;
    phone: number;
    villain: string; // name
    location: Location;
    picture: string; // link to picture
    info: string;
    time!: number; // timestamp
    date!: string; // formatted
    status!: Status;

    constructor(...args: any[]) {
        this.id = args[0];
        this.name = args[1];
        this.phone = args[2];
        this.villain = args[3];
        this.location = args[4];
        this.picture = args[5];
        this.info = args[6];

        if (args.length == 7) {
            this.time = Date.now();
            this.date = this.toDate(this.time);
            this.status = Status.OPEN;
        }
        else if (args.length == 10) {
            this.time = args[7];
            this.date = args[8];
            this.status = args[9];
        }
        
    }

    toDate(time: number): string {
        var date = new Date(time);

	    var year = date.getFullYear();
	    var month = ("0" + (date.getMonth() + 1)).slice(-2);
	    var day = ("0" + date.getDate()).slice(-2);
	    var hour = ("0" + date.getHours()).slice(-2);
	    var minute = ("0" + date.getMinutes()).slice(-2);

	    var ampm = Number(hour) >= 12 ? "pm" : "am";
	    hour = (Number(hour) % 12 || 12).toString();

	    var formattedDate = `${year}-${month}-${day} (${hour}:${minute}${ampm})`;

        return formattedDate;
    }

    getStatus() {
        return Status[this.status];
    }

    static parseReport(r: object) {
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
        return newReport;
    }
}