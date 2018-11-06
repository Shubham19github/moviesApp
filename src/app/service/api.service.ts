import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {
    // storing history of filters of last Visit to Movies List Page, When Pressed Back , it will auto sort based on this value
    filterValue : string = '';
    sortType : string = '';

    constructor(public http: HttpClient) {}

    public getMoviesList(url) {
        return new Promise((resolve, reject) => {
            this.http.get(url, {
                responseType: "json"
            }).subscribe(
                (data : any) => {
                    resolve(data);
                },
                err => {
                    reject(new Error('Could Not Fetch Movies Data'));
                }
            );
        });
    }

    public getMovieDetail(url) {
        return new Promise((resolve, reject) => {
            this.http.get(url, {
                responseType: "json"
            }).subscribe(
                (data : any) => {
                    resolve(data);
                },
                err => {
                    reject(new Error('Could Not Fetch Movies Detail'));
                }
            );
        });
    }

}
