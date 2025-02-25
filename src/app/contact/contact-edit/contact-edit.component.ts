import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  standalone: false,

  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit{

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id']
      if (!id){
        this.editMode = false
        return;
      }
      this.originalContact = this.contactService.getContact(id)

      if (!this.originalContact){
        return
      }
      this.editMode = true;
      this.contact = {...this.originalContact}

      if(this.contact.group){
        this.groupContacts = {...this.contact.group}
      }
    })
  }

  onSubmit(form: NgForm){

  }

  onCreate(){
    this.router.navigate(['/contacts'])
  }
  onUpdate(){
    this.router.navigate(['/contacts'])
  }
  onCancel(){
    this.router.navigate(['/contacts'])
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;  // No contact provided
    if (this.contact?.id === newContact.id) return true;  // Matches current contact
    return this.groupContacts.some(contact => contact.id === newContact.id);  // Checks in groupContacts
  } 
}
