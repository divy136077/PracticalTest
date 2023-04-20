import { CommonModule } from "@angular/common";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [CommonModule, ChatRoutingModule, FormsModule, ReactiveFormsModule,],
  declarations: [ChatComponent]
})
export class ChatModule { }