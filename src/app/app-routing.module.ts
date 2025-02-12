import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {path: 'documents', component: DocumentComponent, children: [
    {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent},
  ]},
  {path: 'messages', component: MessageListComponent},
  {path: 'contacts', component: ContactComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
