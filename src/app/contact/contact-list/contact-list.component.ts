import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy{

  contactList: Contact[] = []
  private subscriptions: Subscription;
  term: string;

  constructor(
    private readonly contactService: ContactService,
  ){}

  ngOnInit(){
    this.contactList = this.contactService.getContacts()

    this.subscriptions = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contactList = contacts
    })
  }

  search(value: string) {
    this.term = value;
    }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
