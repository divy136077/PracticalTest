import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ApiService {


  constructor(public http: HttpClient, private router:Router) { }


  // IsloggedIn() {
  //   return !!localStorage.getItem("authToken")
  // }
//Hii

  //login API ==================================================================================================================================
  login(obj: any) { return this.http.post<any>('http://localhost:8000/signup/login', obj) }


  //sign up 

  add(obj: any) {
    return this.http.post<any>('http://localhost:8000/signup/createuser', obj );
  }

  message(obj:any){
    return this.http.post<any>('http://localhost:8000/user/create', obj );
  }

  get(){
    return this.http.get<any>('http://localhost:8000/user/get' );
  }

}
