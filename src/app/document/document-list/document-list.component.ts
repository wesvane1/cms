import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent implements OnInit, OnDestroy{

  documentList: Document[] = []
  private subscription: Subscription;

  constructor(
    private readonly documentService: DocumentService,
  ){}

  ngOnInit(){
    this.documentList = this.documentService.getDocuments()

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documentList = documents 
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
