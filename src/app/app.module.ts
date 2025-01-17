import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    DocumentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
