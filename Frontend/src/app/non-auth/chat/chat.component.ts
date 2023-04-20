import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatForm: any;
  route: any;
  allData: any;

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private serviceAPI: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getAllData();
    
  }

  getAllData(){
    this.serviceAPI.get().subscribe({
      next: (response: any) => {
        console.log('done', response);
        this.chatForm.reset();
        this.allData = response;
      },
    });
  }

  ngOnInit() {
    this.chatForm = this.fb.group({
      Message: [''],
      File: [''],
    });
  }

  onSubmit() {
    const data: any = {};
    data.Message = this.chatForm.value.Message;
    data.Image = this.chatForm.value.File;
    this.serviceAPI.message(data).subscribe({
      next: (response: any) => {
        console.log('done');
        this.chatForm.reset();
        this.getAllData();

      },
    });
  }

  fileChoose(){
    document.getElementById("myfile")?.click()
  }
  
  }

