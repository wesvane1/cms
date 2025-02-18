import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent {

  constructor(
    private contactService: ContactService,
    private router: Router,
  ){}

  onCreate(){
    this.router.navigate(['/contacts'])
  }
  onUpdate(){
    this.router.navigate(['/contacts'])
  }
}
