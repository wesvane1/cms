import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent implements OnInit{

  @Input() contact: Contact;

  constructor(
    private readonly contactService: ContactService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.route.params.subscribe((params:Params) => {
      const contactId = params['id'];
      this.contact = this.contactService.getContact(contactId)
    })
  }

}
