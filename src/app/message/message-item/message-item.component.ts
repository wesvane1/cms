import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contact/contact.service';
import { Contact } from '../../contact/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {
  
  @Input() message: Message;
  
  messageSender: string;

  constructor(
    private contactService: ContactService
  ) {}


  ngOnInit() {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }
}
