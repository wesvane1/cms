import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();

  documentListChangedEvent = new Subject<Document[]>()

  private documents: Document[] = [];
  private maxDocumentId = 0;

  constructor() {
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId()
  }

  getDocuments(): Document[]{

    return this.documents.slice()
  }

  getDocument(id: string): Document{
    for(const document of this.documents){
      if(document.id === id){
        return document
      }
    }
    return null
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
 }
 
  getMaxId(): number{
    let maxId = 0

    for (const document of this.documents){
      if (+document.id > maxId){
        maxId = +document.id
      }
    }
    return maxId
  }

  addDocument(newDocument: Document){
    if(!newDocument){
      return
    }
    this.maxDocumentId++
    newDocument.id = (this.maxDocumentId).toString()
    this.documents.push(newDocument)
    const documentListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentListClone)
  }
}
