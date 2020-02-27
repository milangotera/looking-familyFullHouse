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
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/check-phone`, { phone: phone }, { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  logout(token) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/logout`, { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  signin(data) {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/signin`, { phone: data.phone, firstname: data.firstname, lastname: data.lastname }, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  invite(token, data) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/invite`, { phone: data.phone, firstname: data.firstname, lastname: data.lastname }, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  change(token, data) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiUrl}/invite`, { id: data.id, phone: data.phone, firstname: data.firstname, lastname: data.lastname }, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  family(token) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/family`, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  loginPhone(phone) {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/login-phone`, { phone: phone }, { headers: headers }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  inviteSuccess(token, id) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/success`, { id: id } , { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  inviteDanger(token, id) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiUrl}/success`, { id: id } , { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  getProfile(token) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/profile`, { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  putProfile(token, data) {
    const headers = new HttpHeaders({ 'Content-Type' :'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` });
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiUrl}/profile`, data , { headers: headers }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
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
