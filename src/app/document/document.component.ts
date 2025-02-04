import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-document',
  standalone: false,
  
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent {

  selectedDocument: Document;

  constructor(
    private readonly documentService: DocumentService
  ){}

  ngOnInit(){
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document
      }
    )
  }

}
