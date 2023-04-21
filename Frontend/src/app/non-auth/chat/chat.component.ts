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
  imageSrc: any;

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
    data.File = this.chatForm.value.File;
    this.serviceAPI.message(data).subscribe({
      next: (response: any) => {
        console.log('done');
        this.chatForm.reset();
        this.getAllData();
      },
    });
  }

  // onSubmit(){
  //       if (this.chatForm.invalid) {
  //         return;
  //       }
  //       // this.error = ''
  //       const formdata = new FormData();
  
  //       Object.entries(this.chatForm.value).forEach((entry: any) => {
  //         const [key, value] = entry;
  
  //         if (key != 'Image' && key != 'File') {
  //           formdata.append(key, value);
  //         }
  //       });
  
  //       formdata.append('Image', this.chatForm.value.File);
  
        
  //       this.serviceAPI.message(formdata).subscribe(
  //         (res) => {
  //           {
  //             next: this.toastr.success('Data Added Successfully!')
  //           }
           
  //         },
         
  //       );
  //     }
    
  

  fileChoose(){
    document.getElementById("myfile")?.click()
  }

  //  onChange(e: any) {
  //   const file = e.target.files[0];
  // }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < 5000000) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    } else if (event.target.files[0].size >= 5000000) {
      alert("File is too big!");
    }
  }

  delete() {
    this.imageSrc = null;
    // this.chatForm.patchValue({ Image: '' });
    // this.chatForm.value.Image.reset()
  }

  
  }

