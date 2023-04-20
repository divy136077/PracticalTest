import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api-services.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: any;
  submitted = false;
  error?: string;
  userData: any;
  number: any;

  get email() {
    return this.loginForm.get('Email');
  }

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private serviceAPI: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get field() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const data: any = {};
    data.Email = this.loginForm.value.Email;
    data.Password = this.loginForm.value.Password;
    this.serviceAPI.login(data).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('/chat');
      },
    });
  }
}
