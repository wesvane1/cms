import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  contactList: Contact[] = [
    new Contact('1','R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3711', '../../../assets/images/jacksonk.jpg', ''),
    new Contact('1','R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3711', '../../../assets/images/barzeer.jpg', '')
  ]

}
