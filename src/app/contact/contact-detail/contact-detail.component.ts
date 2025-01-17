import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent {

  @Input() contact: Contact;

  // contactList: Contact[] = [
  //   new Contact("1","R. Kent Jackson", "jacksonk@byui.edu", "208-496-3711", "../../assets/images/jacksonk.jpg", ""),
  //   new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", "")
  // ]

}
