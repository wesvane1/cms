import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();

  documentListChangedEvent = new Subject<Document[]>()

  private documents: Document[] = [];
  private maxDocumentId = 0;

  constructor(
    private http: HttpClient,
  ) {
    this.documents = this.getDocuments()
    this.maxDocumentId = this.getMaxId()
  }

  getDocuments(): Document[]{
    this.http.get<Document[]>('https://cms-9f75e-default-rtdb.firebaseio.com/documents.json').subscribe((documents: Document[]) => {
      this.documents = documents
      this.maxDocumentId = this.getMaxId()

      this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      this.documentListChangedEvent.next(this.documents.slice());

    }, (error: any) => {
      console.error('Error fetching documents: ', error)
    })
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
    if (!document) return;
    this.documents = this.documents.filter(doc => doc.id !== document.id);
    this.storeDocuments();
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
    this.storeDocuments()
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(!originalDocument || !newDocument){
      return
    }

    const pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.storeDocuments()
  }

  storeDocuments(){
    const documentsJSON = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(
      'https://cms-9f75e-default-rtdb.firebaseio.com/documents.json',
      documentsJSON,
      {headers}
      ).subscribe(() => {
      const documentListClone = this.documents.slice()
      this.documentListChangedEvent.next(documentListClone)
    })
  }
}
