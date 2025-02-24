import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.scss'
})
export class DocumentEditComponent {

  originalDocument: Document;
  document: Document;
  editMode: Boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
  ){}

  onCreate(){
    this.router.navigate(['/documents'])
  }
  onUpdate(){
    this.router.navigate(['/documents'])
  }
}
