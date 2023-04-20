import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../services/api-services.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  selectedlevel: any;
  error?: string;
  empForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public http: HttpClient,
    private serviceAPI: ApiService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.empForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConformPassword: ['', Validators.required],
    });
    console.log("hiiii");
    
  }
  // get field() {
  //   return this.empForm.controls;
  // }

  diag() {
    const data: any = {};
    data.FirstName = this.empForm.value.FirstName;
    data.LastName = this.empForm.value.LastName;
    data.Email = this.empForm.value.Email;
    data.Password = this.empForm.value.Password;
    data.ConformPassword = this.empForm.value.ConformPassword;
    this.serviceAPI.add(data).subscribe((response: any) => {
      console.log(response);
      // alert("Data sucessfully Added")
      this.toastr.success('Data Added Successfully!');
      this.router.navigateByUrl('/listview');
    });
  }
}
