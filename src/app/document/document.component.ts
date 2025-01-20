import { Component } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'app-document',
  standalone: false,
  
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent {

  selectedDocument: Document;

}
