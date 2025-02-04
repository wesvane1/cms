import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documentList: Document[] = []

  constructor(
    private readonly documentService: DocumentService,
  ){}

  ngOnInit(){
    this.documentList = this.documentService.getDocuments()
  }

  onSelect(document: Document){
    this.selectedDocumentEvent.emit(document)
  }

}
