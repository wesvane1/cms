import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss'
})
export class DocumentDetailComponent implements OnInit{

  document: Document;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly documentService: DocumentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const documentId = params['id'];
      this.document = this.documentService.getDocument(documentId);
    });
  }
}
