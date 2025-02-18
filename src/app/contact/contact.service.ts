import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId = 0;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId()
  }

  getContacts(): Contact[]{
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

  deleteContact(contact: Contact) {
    if (!document) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
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
  
    addDocument(newContact: Contact){
      if(!newContact){
        return
      }
      this.maxContactId++
      newContact.id = (this.maxContactId).toString()
      this.contacts.push(newContact)
      const contactListClone = this.contacts.slice()
      this.contactListChangedEvent.next(contactListClone)
    }
}
