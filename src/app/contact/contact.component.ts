import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  selectedContact: Contact

}
