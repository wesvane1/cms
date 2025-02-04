import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contactList: Contact[] = []

  constructor(
    private readonly contactService: ContactService,
  ){}

  ngOnInit(){
    this.contactList = this.contactService.getContacts()
  }

  onSelect(contact: Contact){
    this.selectedContactEvent.emit(contact)
  }

}
