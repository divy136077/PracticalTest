import { SignupRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [ SignupRoutingModule, FormsModule, ReactiveFormsModule,],
  declarations: [SignupComponent]
})
export class SignupModule {
  constructor(){

    console.log("hello");
  }
  
 }