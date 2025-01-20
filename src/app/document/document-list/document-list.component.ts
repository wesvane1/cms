import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documentList: Document[] = [
    new Document('1', 'TestDoc1', 'This is the FIRST test', 'https://www.linkedin.com/in/wesleyvane1', []),
    new Document('2', 'TestDoc2', 'This is the SECOND test', 'https://www.linkedin.com/in/wesleyvane1', []),
    new Document('3', 'TestDoc3', 'This is the THIRD test', 'https://www.linkedin.com/in/wesleyvane1', []),
    new Document('4', 'TestDoc4', 'This is the FOURTH test', 'https://www.linkedin.com/in/wesleyvane1', [])
  ]

  onSelect(document: Document){
    this.selectedDocumentEvent.emit(document)
  }

}
