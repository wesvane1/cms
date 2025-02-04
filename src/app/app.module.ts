import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contact/contact-item/contact-item.component';
import { DocumentComponent } from './document/document.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentItemComponent } from './document/document-item/document-item.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { MessageComponent } from './message/message.component';
import { MessageItemComponent } from './message/message-item/message-item.component';
import { MessageEditComponent } from './message/message-edit/message-edit.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { DocumentService } from './document/document.service';
import { ContactService } from './contact/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ContactService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
