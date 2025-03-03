import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId = 0;

  constructor(
    private http: HttpClient
  ) {
    this.contacts = this.getContacts();
    this.maxContactId = this.getMaxId()
  }

  getContacts(): Contact[]{
    this.http.get<Contact[]>('http://localhost:3000/contacts').subscribe((contacts: Contact[]) => {
      this.contacts = contacts
      this.maxContactId = this.getMaxId()

      this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      this.contactListChangedEvent.next(this.contacts.slice());

    }, (error: any) => {
      console.error('Error fetching contacts: ', error)
    })
    return this.contacts.slice()
  }

  getContact(id: string): Contact{
    for(const contact of this.contacts){
      if(contact.id === id){
        return contact
      }
    }
    return null
  }

  getMaxId(): number{
    let maxId = 0

    for (const contact of this.contacts){
      if (+contact.id > maxId){
        maxId = +contact.id
      }
    }
    return maxId
  }

  addDocument(contact: Contact) {
    if (!contact) {
      return;
    }
    // make sure id of the new Document is empty
    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact.id = originalContact.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(d => d.id === contact.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    const contactsJSON = JSON.stringify(this.contacts); // Convert documents to JSON string
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Send the updated documents to the backend
    this.http.put(
      'http://localhost:3000/contacts', // Use your local Node.js server URL
      contactsJSON,
      { headers }
    ).subscribe(
      () => {
        // Once the documents are successfully stored, notify other components
        const contactListClone = this.contacts.slice(); // Clone the document list to avoid reference issues
        this.contactListChangedEvent.next(contactListClone); // Emit the updated documents list
      },
      (error) => {
        console.error('Error storing contacts:', error); // Error handling
      }
    );
  }
}
