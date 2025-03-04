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
  
  messageSender?: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    console.log("Message Sender: ", this.message.sender)
    if(this.message.sender){
      const contact: Contact = this.contactService.getContact(this.message.sender);
  
      console.log("CONTACT DATA: ", contact);
  
      // Handle cases where contact is undefined
      this.messageSender = contact.name;
    } else{
      this.messageSender = "Unknown";
    }
  }
}
