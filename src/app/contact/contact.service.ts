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

  getContact(id: string): Contact{
    for(const contact of this.contacts){
      if(contact.id === id){
        return contact
      }
    }
    return null
  }

  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
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
  
    addContact(newContact: Contact){
      if(!newContact){
        return
      }
      this.maxContactId++
      newContact.id = (this.maxContactId).toString()
      this.contacts.push(newContact)
      this.storeContacts()
    }

    updateContact(originalContact: Contact, newContact: Contact){
      if(!originalContact || !newContact){
        return
      }
  
      const pos = this.contacts.indexOf(originalContact)
      if(pos < 0){
        return
      }
  
      newContact.id = originalContact.id
      this.contacts[pos] = newContact
      this.storeContacts()
    }

    getContacts(): Contact[]{
      this.http.get<Contact[]>('https://cms-9f75e-default-rtdb.firebaseio.com/contacts.json').subscribe((contacts: Contact[]) => {
        this.contacts = contacts
        this.maxContactId = this.getMaxId()
  
        this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.contactListChangedEvent.next(this.contacts.slice());
  
      }, (error: any) => {
        console.error('Error fetching contacts: ', error)
      })
      return this.contacts.slice()
    }

    storeContacts(){
      const contactsJSON = JSON.stringify(this.contacts);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(
        'https://cms-9f75e-default-rtdb.firebaseio.com/contacts.json',
        contactsJSON,
        {headers}
        ).subscribe(() => {
        const contactListClone = this.contacts.slice()
        this.contactListChangedEvent.next(contactListClone)
      })
    }
}
