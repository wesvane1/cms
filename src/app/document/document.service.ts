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
    // this.http.get<Document[]>('https://cms-9f75e-default-rtdb.firebaseio.com/documents.json').subscribe((documents: Document[]) => {
    this.http.get<Document[]>('http://localhost:3000/documents').subscribe((documents: Document[]) => {
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
 
  getMaxId(): number{
    let maxId = 0
    for (const document of this.documents){
      if (+document.id > maxId){
        maxId = +document.id
      }
    }
    return maxId
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    // make sure id of the new Document is empty
    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument.id = originalDocument.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    const documentsJSON = JSON.stringify(this.documents); // Convert documents to JSON string
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Send the updated documents to the backend
    this.http.put(
      'http://localhost:3000/documents', // Use your local Node.js server URL
      documentsJSON,
      { headers }
    ).subscribe(
      () => {
        // Once the documents are successfully stored, notify other components
        const documentListClone = this.documents.slice(); // Clone the document list to avoid reference issues
        this.documentListChangedEvent.next(documentListClone); // Emit the updated documents list
      },
      (error) => {
        console.error('Error storing documents:', error); // Error handling
      }
    );
  }
  
  
}
