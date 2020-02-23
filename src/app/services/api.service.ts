import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://lookingapps-5a998.appspot.com/app';

  constructor(
    public http: HttpClient
  ){

  }

  checkPhone(phone) {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return new Promise(resolve => {
      this.http.post(`${this.apiUrl}/check-phone`, { phone: phone }, { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loginPhone(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/login-phone`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getProfile() {
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/check-phone`,{
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getIpAddress() {
    return new Promise(resolve => {
      this.http.get(`http://api.ipify.org/?format=json`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getIpInfo(ip) {
    return new Promise(resolve => {
      this.http.get(`http://ip-api.com/json/${ip}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getCountry(country) {
    return new Promise(resolve => {
      this.http.get(`https://restcountries.eu/rest/v2/name/${country}?fields=name;cioc;flag;callingCodes`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getCountries() {
    return new Promise(resolve => {
      this.http.get(`https://restcountries.eu/rest/v2/all?fields=name;cioc;flag;callingCodes`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
