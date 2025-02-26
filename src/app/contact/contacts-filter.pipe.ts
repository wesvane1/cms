import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  // Mine
  // transform(contactList: Contact[], filteredString: string, propName: string) {

  //   if (!filteredString) return contactList;

  //   const filteredContacts = contactList.filter(contact =>
  //     contact[propName].toLowerCase().includes(filteredString.toLowerCase())
  //   );

  //   return filteredContacts.length > 0 ? filteredContacts : contactList;
  // }

  // Given example
  transform(contacts: Contact[], term) { 
    let filteredContacts: Contact[] =[];  
    if (term && term.length > 0) {
       filteredContacts = contacts.filter(
          (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
       );
    }
    if (filteredContacts.length < 1){
       return contacts;
    }
    return filteredContacts;
 }

}
